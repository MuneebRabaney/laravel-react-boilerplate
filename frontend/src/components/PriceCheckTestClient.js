import React, { Component, Fragment } from 'react';
import Grid from './Grid';
import styled, { css } from 'styled-components';
import { Api } from '../helpers';

const Content = styled.p`
  min-height: 20px;
  padding: 10px 20px;
  ${({ left }) =>
    left &&
    css`
      float: left;
    `}
  ${({ right }) =>
    right &&
    css`
      float: right;
    `}
  strong {
    font-weight: 600;
  }
`;

class PriceCheckTestClient extends Component {
  state = {
    output: null,
    input: [],
    loading: false,
  };

  /**
   *  @Method {handleGenerateRandomInput}
   *  @description Generates Random number list
   *  @return Function
   * */
  handleGenerateRandomInput = () => {
    let { min, max } = this.props.data;
    const errors = this.handleInputErrors({
      values: [min, max],
    });
    if (!errors.count) {
      const result = [];
      min = parseInt(min);
      max = parseInt(max);
      for (let index = min; index <= max; index++) result.push(index);
      return this.handleNumberRemoval({ result });
    }
    console.log(errors);
  };

  /**
   *  @Method {handleInputErrors}
   *  @description handles errros from missing props
   *  @param {Object<String>}
   *  @return Object
   * */
  handleInputErrors = ({ values }) => {
    const errors = {};
    values.map(value => {
      if (!value) {
        errors[value] = Error('Please fill in a min and max value');
      }
      if (typeof value !== 'number') {
        errors[value] = Error(`${value} must be of the type number`);
      }
      return null;
    });
    const { length: errorCount } = Object.keys(errors);
    if (errorCount) errors.count = errorCount;
    return errors;
  };

  /**
   *  @Method {handleNumberRemoval}
   *  @description removes numbers from the list
   *  @param {Object<String, Array>}
   *  @return null
   * */
  handleNumberRemoval = ({ result }) => {
    if (result.length) {
      let exclude = [11, 9, 8, 7, 5, 14, 15, 16, 17, 19];
      result = result.filter(item => !exclude.includes(item));
      const state = Object.assign({}, this.state);
      state.input = this.handleShuffleArray({
        list: result,
      });
      this.setState(state, this.handleApiSubmission);
    }
    return null;
  };

  /**
   *  @Method {handleShuffleArray}
   *  @description takes an array list and shuffles the values
   *  @param {Object<String, Array>}
   *  @return Function
   * */
  handleShuffleArray = ({ list }) => {
    for (let index = list.length - 1; index > 0; index--) {
      const swapValue = Math.floor(Math.random() * (index + 1));
      [list[index], list[swapValue]] = [list[swapValue], list[index]];
    }
    return this.handleSortArrayByAscendingOrder({
      list,
    });
  };

  /**
   *  @Method {handleSortArrayByAscendingOrder}
   *  @description Sorts a list by order ascending
   *  @param {Object<String, Array>}
   *  @return Function
   * */
  handleSortArrayByAscendingOrder = ({ list = [] }) => {
    if (list) return list.sort((a, b) => a - b);
  };

  /**
   *  @Method {handleApiSubmission}
   *  @description Submits data to the API endpoint
   *  @return String
   * */
  handleApiSubmission = () => {
    this.handleLoading({ busy: true });
    const { input } = this.state;
    const data = { values: input, max: 20 };
    const endpoint = 'process-data';
    return Api.post({
      data,
      endpoint,
    }).then(result => {
      this.handleLoading({ busy: false });
      return result && this.printResultToScreen({ result });
    });
  };

  /**
   *  @Method {handleLoading}
   *  @description Indicates when the component is in a data pending state
   *  @param {Object<String, Array> | Bool}
   *  @return Function
   *  @throw Error
   * */
  handleLoading = ({ busy }) => {
    if (typeof busy !== 'undefined') {
      const state = Object.assign({}, this.state);
      state.loading = busy;
      return this.setState(state);
    }
    return Error('Missing method argument');
  };

  /**
   *  @Method {printResultToScreen}
   *  @description Prints an output to the screen
   *  @param {Object<String, Array> | Bool}
   *  @return Function
   * */
  printResultToScreen = ({ result } = false) => {
    if (result) {
      const state = Object.assign({}, this.state);
      state.output = result;
      this.setState(state);
    }
  };

  /**
   *  @Method {handleUpdateInput}
   *  @description Updates the input values in state then submits them to the API
   *  @param {Object<String, Array>}
   *  @return Function
   * */
  handleUpdateInput = ({ values }) => {
    const state = Object.assign({}, this.state);
    state.input = values;
    this.setState(state, this.handleApiSubmission);
  };

  render() {
    const { data } = this.props;
    const { output, loading } = this.state;
    return (
      <Fragment>
        <Content right>{loading && 'Loading...'}</Content>
        <Content left>
          Server Response Output: <strong>{output}</strong>
        </Content>
        <Grid
          max={data.max}
          onGenerateBlocks={this.handleGenerateRandomInput}
          onBlocksSelectionCompleted={this.handleUpdateInput}
        />
      </Fragment>
    );
  }
}

export default PriceCheckTestClient;
