import React, { Component, Fragment } from 'react';
import { Button, Block } from './ui';
import { Container } from './layout';

class Grid extends Component {
  state = {
    blocks: [],
  };

  /**
   *  @Method {handleOnClick}
   *  @description Adds or removes blocks based on position in state
   *  @return Function
   * */
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

  /**
   *  @Method {handleAddBlockToState}
   *  @description Adds a block to the state
   *  @return void
   * */
  handleAddBlockToState = ({ value }) => {
    const state = Object.assign({}, this.state);
    state.blocks = [...this.state.blocks, value];
    this.setState(state);
  };

  /**
   *  @Method {handleRemoveBlockFromState}
   *  @description Removes a block from the state
   *  @return void
   * */
  handleRemoveBlockFromState = ({ value }) => {
    const state = Object.assign({}, this.state);
    state.blocks = this.state.blocks.filter(block => block !== value);
    this.setState(state);
  };

  /**
   *  @Method {handleBlockSelected}
   *  @description Indicates when a block is selected
   *  @return Boolean
   * */
  handleBlockSelected = ({ value }) => {
    const { blocks } = this.state;
    return blocks.find(block => block === value);
  };

  /**
   *  @Method {handleBlockSelectionCompleted}
   *  @description Get all the selected blocks
   *  @return Function
   * */
  handleBlockSelectionCompleted = () => {
    const { blocks } = this.state;
    const { onBlocksSelectionCompleted } = this.props;
    if (onBlocksSelectionCompleted) {
      return onBlocksSelectionCompleted({
        values: blocks,
      });
    }
  };

  /**
   *  @Method {handleGenerateBlockSelectionCompleted}
   *  @description Auto generates numbers for a selection
   *  @return Function
   * */
  handleGenerateBlockSelectionCompleted = () => {
    const { onGenerateBlocks } = this.props;
    if (onGenerateBlocks) return onGenerateBlocks();
  };

  /**
   *  @Method {renderBlocks}
   *  @description Renders a Block Compoent to the screen
   *  @return Array
   * */
  renderBlocks = () => {
    const results = [];
    let { max } = this.props || 20;
    if (max > 20) max = 20;
    for (let value = 1; value <= max; value++) {
      const item = (
        <Block
          id={value}
          key={value}
          onClick={this.handleOnClick}
          selected={this.handleBlockSelected({ value })}>
          <span>{value}</span>
        </Block>
      );
      results.push(item);
    }
    return results;
  };

  render() {
    return (
      <Fragment>
        <Container grid>{this.renderBlocks()}</Container>
        <Container centerInnerElements>
          <Button onClick={this.handleBlockSelectionCompleted} type='button'>
            Submit
          </Button>
          <Button
            type='button'
            onClick={this.handleGenerateBlockSelectionCompleted}>
            Auto Generate
          </Button>
        </Container>
      </Fragment>
    );
  }
}

export default Grid;
