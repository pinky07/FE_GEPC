import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ContextMenuProvider } from 'react-contexify';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
} from 'reactstrap';
import SortableTree, {
  removeNodeAtPath,
  addNodeUnderParent,
  changeNodeAtPath
} from 'react-sortable-tree';
import { 
  getAllocationTree, 
  selectNode, 
  saveAllocationTree 
} from '../actions';
import NodeMenu from './nodeMenu';
import TreeButtonBar from './treeButtonBar';
import NodeDetails from './nodeDetails';


class AllocationTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
    };
  }

  componentDidMount () {
    this.props.getAllocationTree();
  }

  newNode = (node) => {
    let nd = Object.assign({}, node);
    return _.forOwn(nd, (value, key) => {
      nd[key] = '';
    });
  }

  addAbove = () => {
    let { path, node } = this.props.selectedNode;
    let treeData = Object.assign([], this.state.treeData);

    treeData = changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: {
        ...this.newNode(node),
        title: `${node.title} parent`,
        accountgroupname: `${node.title} parent`,
        children: [node],
        expanded: true
      },
    });

    this.setState(state => ({
      treeData,
      // selectedNode: {}
    }));
  }

  addSibling = () => {
    let { node, path, treeIndex } = this.props.selectedNode;//this.state.selectedNode;

    this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length-2],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: {
          ...this.newNode(node),
          title: `${node.title} sibling`,
          accountgroupname: `${node.title} sibling`
        },
      }).treeData,
      //selectedNode: {}
    }));
  }

  addBelow = () => {
    let { node, path, treeIndex } = this.props.selectedNode;//this.state.selectedNode;

    this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: {
          ...this.newNode(node),
          title: ` ${node.title} child`,
          accountgroupname: ` ${node.title} child`,
        },
      }).treeData,
      //selectedNode: {}
    }))
  }

  deleteBelow = () => {
    let { path, node, treeIndex } = this.props.selectedNode;//this.state.selectedNode;

    if (node.children) {
      let firstChildPath = treeIndex + 1;
      let childrenPath = path.concat([firstChildPath]);
      let treeData = Object.assign([], this.state.treeData);

      for (let i = 0, length = node.children.length; i < length; i++) {
        treeData = changeNodeAtPath({
          treeData,
          path: childrenPath,
          getNodeKey: ({ treeIndex }) => treeIndex,
          newNode: null,
        });
      }

      this.setState(state => ({
        treeData,
        //selectedNode: {}
      }));
    }
  }

  deleteNode = () => {
    let { path, treeIndex } = this.props.selectedNode;//this.state.selectedNode;

    this.setState(state => ({
      treeData: removeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey: ({ treeIndex }) => treeIndex
      }),
     // selectedNode: {}
    }));
    // this.props.selectNode(undefined);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.treeData !== this.props.treeData) {
      let { treeData } = nextProps;

      if (treeData.length) {
        treeData[0].expanded = true;
      }
      this.setState({
        treeData,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.treeData !== this.state.treeData || nextProps.treeData !== this.props.treeData;
  }

  saveTree = () => {
    this.props.saveAllocationTree(this.state.treeData);
  }

  toggle = () => {}

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

    return rowInfo.treeIndex !== 0 ? buttons : buttons.slice(1);
  }

  render () {
    //const getNodeKey = ({ treeIndex }) => treeIndex;
    return (

      <Container>
        <Row className="treeHeader">
          <Col lg="4" md="4" sm="1" xs="1">
            <Dropdown isOpen={false} toggle={this.toggle}>
              <DropdownToggle caret>
                Bose Current Tree
              </DropdownToggle>
            </Dropdown>
          </Col>

          <Col lg="8" md="8" sm="11" xs="11">
            <TreeButtonBar save={this.saveTree}  />
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="8" sm="12" className="treecontainer">
            <SortableTree
              treeData={this.state.treeData}
              onChange={treeData => this.setState({ treeData })}
              canDrop={ ({ nextPath }) => nextPath.length > 1}
              generateNodeProps={rowInfo => ({
                buttons: this.treeButtons(rowInfo),
              })}
            />
            <NodeMenu
              addAbove={this.addAbove}
              addSibling={this.addSibling}
              addBelow={this.addBelow}
              deleteNode={this.deleteNode}
              deleteBelow={this.deleteBelow}
            />
          </Col>
          <Col lg="4" md="4" sm="12">
            <NodeDetails />
          </Col>
        </Row>
      </Container>
    );
  }
}

AllocationTree.propTypes = {
  treeData: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    ...state.allocationTree
  };
};

export default connect( mapStateToProps, {
  getAllocationTree,
  selectNode,
  saveAllocationTree
} )(AllocationTree);
