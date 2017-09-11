import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ContextMenuProvider } from 'react-contexify';
import {
  Row,
  Col,
  Input,
} from 'reactstrap';
import SortableTree from 'react-sortable-tree';
import {
  getAllocationTree,
  saveAllocationTree,
  selectNode,
  updateTree,
} from '../actions';
import Constants from '../services/constants';
import NodeMenu from './nodeMenu';
import TreeButtonBar from './treeButtonBar';
import NodeDetails from './nodeDetails';
import BetaGroupDropdown from './betaGroupDropdown';
import TreeNodeRenderer from './treeNodeRenderer';

export class AllocationTree extends React.Component {

  componentDidMount () {
    this.props.getAllocationTree();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tree !== this.props.tree) {
      if (!this.props.selectedNode) {
        this.props.selectNode({ node: nextProps.tree.data[0] });
      }
    }
  }

  saveTree = () => {
    this.props.saveAllocationTree(this.props.tree);
  }

  treeButtons = rowInfo => {
    const buttons = [
      <ContextMenuProvider id="menu_id" event="onClick">
        <button
          onClick={() => this.props.selectNode(rowInfo)}
        >
          ...
        </button>
      </ContextMenuProvider>,
      <button
        className="buttonInfoNode"
        onClick={() => this.props.selectNode(rowInfo)}
      >
        ...
      </button>,
    ];

    return buttons;
  }

  render () {
    const { tree } = this.props;
    return (
      <div className="allocationTree">
        <Row className="treeHeader">
          <Col lg="3" md="3" sm="12" xs="12">
            <h5>{tree.name}</h5>
          </Col>

          <Col lg="5" md="5" sm="12" xs="12">
            <TreeButtonBar
              save={this.saveTree}
            />
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <div className="settings">
              <Input placeholder="Global Set" />
              <BetaGroupDropdown />
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="8" sm="12" className="treecontainer">
            <SortableTree
              treeData={tree.data}
              onChange={treeData => this.props.updateTree(treeData)}
              canDrop={ ({ nextPath }) => nextPath.length > 1}
              maxDepth={Constants.MAX_TREE_DEPTH}
              generateNodeProps={rowInfo => ({
                buttons: this.treeButtons(rowInfo),
              })}
              nodeContentRenderer={TreeNodeRenderer}
            />
            <NodeMenu/>
          </Col>
          <Col lg="4" md="4" sm="12">
            <NodeDetails />
          </Col>
        </Row>
      </div>
    );
  }
}

AllocationTree.propTypes = {
  tree: PropTypes.object.isRequired,
};

AllocationTree.defaultProps = {
  tree: {
    name: '',
    data: []
  },
  treeData: [],
};

const mapStateToProps = state => {
  return {
    ...state.allocationTree
  };
};

export default connect( mapStateToProps, {
  getAllocationTree,
  saveAllocationTree,
  selectNode,
  updateTree,
} )(AllocationTree);
