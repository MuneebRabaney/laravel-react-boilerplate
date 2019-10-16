import React, { Component } from 'react';

export default class PriceCheckTestClient extends Component {
  state = {
    output: null,
    input: [],
  };

  componentDidMount() {
    this.handleGenerateRandomInput();
  }

  handleApiSubmission = async () => {
    // in the api controller we will
    // do this
    const { input } = this.state;
    await fetch('http://price-check-test-server.local/api/process-data', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'http://localhost:3000',
      },
      method: 'POST',
      body: JSON.stringify({
        input,
        max: 20,
      }),
    })
      .then(response => response.json())
      .then(result => this.printResultToScreen({ result }))
      .catch(error => console.error('Error:', error));
  };

  handleSortArrayByAscendingOrder = ({ list = [] }) => {
    if (list) return list.sort((a, b) => a - b);
  };

  handleShuffleArray = ({ list }) => {
    for (let index = list.length - 1; index > 0; index--) {
      const swapValue = Math.floor(Math.random() * (index + 1));
      [list[index], list[swapValue]] = [list[swapValue], list[index]];
    }
    return this.handleSortArrayByAscendingOrder({
      list,
    });
  };

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

  handleNumberRemoval = ({ result }) => {
    if (result.length) {
      let exclude = [11, 9, 8, 7, 5, 14, 15, 16, 17, 19];
      result = result.filter(item => !exclude.includes(item));
      const state = Object.assign({}, this.state);
      state.input = this.handleShuffleArray({
        list: result,
      });
      this.setState(state, () => this.handleApiSubmission());
    }
    return null;
  };

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

  printResultToScreen = ({ result } = false) => {
    if (result) {
      const state = Object.assign({}, this.state);
      state.output = result;
      this.setState(state);
    }
  };

  render() {
    return <div>{this.state.output}</div>;
  }
}