import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: grid;
  background: lightblue;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: repeat(5, 120px);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const Block = styled.div`
  background: lightgreen;
  position: relative;
  color: #000;
  ${({ selected }) =>
    selected &&
    css`
      background: tomato;
    `}
  > span {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Button = styled.button`
  margin: 20px auto;
  width: 200px;
  height: 35px;
  display: block;
  ${({ activated }) =>
    activated &&
    css`
      background: green;
    `}
`;

class Grid extends Component {
  state = {
    blocks: [],
  };

  handleOnClick = event => {
    const id = parseInt(event.currentTarget.id);

    if (!this.state.blocks.includes(id)) {
      // Adds a block to the state
      return this.handleAddBlockToState({ value: id });
    }
    // Removes a block from the state
    return this.handleRemoveBlockFromState({
      value: id,
    });
  };

  handleAddBlockToState = ({ value }) => {
    const state = Object.assign({}, this.state);
    state.blocks = [...this.state.blocks, value];
    this.setState(state);
  };

  handleRemoveBlockFromState = ({ value }) => {
    const state = Object.assign({}, this.state);
    state.blocks = this.state.blocks.filter(block => block !== value);
    this.setState(state);
  };

  handleBlockSelected = ({ value }) => {
    const { blocks } = this.state;
    return blocks.find(block => block === value);
  };

  handleBlockSelectionCompleted = () => {
    const { onBlocksSelectionCompleted, max } = this.props;
    const { blocks } = this.state;
    const maxLimitSelection = max - 3;
    if (blocks.length > 0 || blocks.length <= maxLimitSelection) {
      if (onBlocksSelectionCompleted)
        return onBlocksSelectionCompleted({
          values: blocks,
        });
    }
  };

  renderBlocks = () => {
    let { max } = this.props || 20;
    if (max > 20) max = 20;
    const results = [];
    for (let index = 1; index <= max; index++) {
      const item = (
        <Block
          selected={this.handleBlockSelected({
            value: index,
          })}
          key={index}
          id={index}
          onClick={this.handleOnClick}>
          <span>{index}</span>
        </Block>
      );
      results.push(item);
    }
    return results;
  };

  render() {
    return (
      <Fragment>
        <Container>{this.renderBlocks()}</Container>
        <Button onClick={this.handleBlockSelectionCompleted} type='button'>
          Submit
        </Button>
      </Fragment>
    );
  }
}

export default Grid;
