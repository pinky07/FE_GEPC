import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addAboveNode,
  addSiblingNode,
  addBelowNode,
  deleteBelowNode,
  deleteNode,
  jumpLevel,
} from '../../actions';
import { ContextMenu, Item } from 'react-contexify';
import { Input } from 'reactstrap';
import TreeService from '../../services/treeService';

export class NodeMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      jumpLevel: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.selectedNode) {
      return;
    }
    if (nextProps.selectedNode !== this.props.selectedNode) {
      this.setState({
        jumpLevel: nextProps.selectedNode.maxDepth,
      });
    }
  }

  isRootNode = () => TreeService().isRootNode(this.props.selectedNode);

  onChangeInput = event => {
    const max = this.props.selectedNode.maxDepth;
    let jumpLevel = parseInt(event.target.value, 10);

    jumpLevel = jumpLevel >  max ? max : jumpLevel;
    jumpLevel = jumpLevel <  1 ? 1 : jumpLevel;
    this.setState({
      jumpLevel
    });
  }

  onKeyUp = event => {
    if(event.key === 'Enter'){
      this.props.jumpLevel(this.state.jumpLevel);
      event.target.parentNode.click();
    }
  }

  render () {
    return (
      <ContextMenu id='menu_id'>
        <Item  onClick={this.props.addAboveNode} disabled={this.isRootNode()}>
          Add a Node Above
        </Item>
        <Item  onClick={this.props.addSiblingNode} disabled={this.isRootNode()}>
          Add a Sibling Node
        </Item>
        <Item onClick={this.props.addBelowNode}>
          Add a Node Below
        </Item>
        <Item disabled>
          Copy a Node
        </Item>
        <Item onClick={this.props.deleteNode} disabled={this.isRootNode()}>
          Delete a Node
        </Item>
        <Item onClick={this.props.deleteBelowNode} disabled={this.isRootNode()}>
          Delete the Children Nodes Below
        </Item>
        <Item onClick={() => this.props.jumpLevel(this.state.jumpLevel)} disabled={!this.state.jumpLevel}>
          <div  className="nodeMenu">
            <span>Jump Node Level</span>
            <Input type="number"
                   step="1"
                   min="1"
                   max={this.props.selectedNode && this.props.selectedNode.maxDepth}
                   value={this.state.jumpLevel}
                   onClick={event => event.stopPropagation()}
                   onChange={this.onChangeInput}
                   onKeyUp={this.onKeyUp}
            />
          </div>
        </Item>
      </ContextMenu>
    );
  }
}

NodeMenu.propTypes = {
  selectedNode: PropTypes.object,
  jumpLevel: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
  return {
    selectedNode: state.allocationTree.selectedNode
  };
};

export default connect(mapStateToProps,  {
  addAboveNode,
  addSiblingNode,
  addBelowNode,
  deleteBelowNode,
  deleteNode,
  jumpLevel,
} )(NodeMenu);

