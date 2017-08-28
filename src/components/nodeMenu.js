import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContextMenu, Item } from 'react-contexify';
import { Input } from 'reactstrap';

export class NodeMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      jumpLevel: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedNode !== this.props.selectedNode) {
      this.setState({
        jumpLevel: nextProps.selectedNode.maxDepth,
      });
    }
  }

  isRootNode = () => {
    return this.props.selectedNode && this.props.selectedNode.treeIndex === 0;
  }

  onChange = event => {
    this.setState({
      jumpLevel: event.target.value
    });
  }

  render () {
    return (
      <ContextMenu id='menu_id'>
        <Item  onClick={this.props.addAbove} disabled={this.isRootNode()}>
          Add a Node Above
        </Item>
        <Item  onClick={this.props.addSibling} disabled={this.isRootNode()}>
          Add a Sibling Node
        </Item>
        <Item onClick={this.props.addBelow}>
          Add a Node Below
        </Item>
        <Item disabled>
          Copy a Node
        </Item>
        <Item onClick={this.props.deleteNode} disabled={this.isRootNode()}>
          Delete a Node
        </Item>
        <Item onClick={this.props.deleteBelow} disabled={this.isRootNode()}>
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
                   onChange={this.onChange}
            />
          </div>
        </Item>
      </ContextMenu>
    );
  }
}

NodeMenu.propTypes = {
  selectedNode: PropTypes.object.isRequired,
  jumpLevel: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  deleteBelow: PropTypes.func.isRequired,
  addBelow: PropTypes.func.isRequired,
  addSibling: PropTypes.func.isRequired,
  addAbove: PropTypes.func.isRequired,
};


const mapStateToProps = state => {
  return {
    selectedNode: state.allocationTree.selectedNode
  };
};

export default connect(mapStateToProps, null)(NodeMenu);
