import React from 'react';
import { connect } from 'react-redux';
import { ContextMenu, Item } from 'react-contexify';
import { Input } from 'reactstrap';

export class NodeMenu extends React.Component {

  isRootNode = () => {
    return this.props.selectedNode && this.props.selectedNode.treeIndex === 0;
  }

  render () {
    return (
      <ContextMenu id='menu_id'>
        <Item  onClick={this.props.addAbove} disabled={this.isRootNode()}>
          Add Above
        </Item>
        <Item  onClick={this.props.addSibling} disabled={this.isRootNode()}>
          Add Sibling
        </Item>
        <Item onClick={this.props.addBelow}>
          Add Below
        </Item>
        <Item onClick={this.props.deleteNode} disabled={this.isRootNode()}>
          Delete Node
        </Item>
        <Item onClick={this.props.deleteBelow}>
          Delete Below
        </Item>
        <Item  disabled>
          <div  className="nodeMenu">
            <span>Jump Level</span>
            <Input type="number" step="1" disabled/>
          </div>
        </Item>
      </ContextMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedNode: state.allocationTree.selectedNode
  };
};

export default connect(mapStateToProps, null)(NodeMenu);
