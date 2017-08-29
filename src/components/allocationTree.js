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
  DropdownItem,
  DropdownMenu,
  Input,
} from 'reactstrap';
import SortableTree, {
  removeNodeAtPath,
  addNodeUnderParent,
  changeNodeAtPath,
} from 'react-sortable-tree';
import { 
  getAllocationTree, 
  selectNode, 
  saveAllocationTree,
  getBetaGroups,
} from '../actions';
import Constants from '../services/constants';
import NodeMenu from './nodeMenu';
import TreeButtonBar from './treeButtonBar';
import NodeDetails from './nodeDetails';

class AllocationTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      dropdownBetaGroupOpen: false,
    };
  }

  componentDidMount () {
    this.props.getAllocationTree();
    this.props.getBetaGroups();
  }

  newNode = node => {
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
        title: Constants.defaultNodeName,
        accountgroupname: Constants.defaultNodeName,
        children: [node],
        expanded: true,
      },
    });

    this.setState(state => ({
      treeData,
      // selectedNode: {}
    }));
  }

  addSibling = () => {
    let { node, path, treeIndex } = this.props.selectedNode;

    this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length-2],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: {
          ...this.newNode(node),
          title: Constants.defaultNodeName,
          accountgroupname: Constants.defaultNodeName,
        },
      }).treeData,
    }));
  }

  addBelow = () => {
    let { node, path, treeIndex } = this.props.selectedNode;

    this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: {
          ...this.newNode(node),
          title: Constants.defaultNodeName,
          accountgroupname: Constants.defaultNodeName,
        },
      }).treeData,
      //selectedNode: {}
    }))
  }

  deleteBelow = () => {
    let { path, node, treeIndex } = this.props.selectedNode;

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
    let { path, treeIndex } = this.props.selectedNode;

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

  getMaxDepth = ({ children }) => {
    let maxDepth = 0;
    if (children) {
      let depth = 0;
      children.forEach( child => {
        depth = this.getMaxDepth(child) + 1;
        maxDepth = depth > maxDepth ? depth : maxDepth;
      });
    }
    return maxDepth;
  }

  jumpLevel = level => {
    let treeData = Object.assign([], this.state.treeData);
    let { path, node } = this.props.selectedNode;
    
    this.expandNodes(node, level);
    treeData = changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: node
    });

    this.setState(state => ({
      treeData,
    }));
  }

  expandNodes = (node, level) => {
    const { children } = node;

    if (children && level > 0) {
      children.forEach( child => {
        const currentLevel = level - 1;
        this.expandNodes(child, currentLevel);
        node.expanded = true;
      });
    }
  }

  saveTree = () => {
    this.props.saveAllocationTree(this.state.treeData);
  }

  toggle = () => {}

  betaGroupToggle = () => { console.log(this.state)
    this.setState({
      dropdownBetaGroupOpen: !this.state.dropdownBetaGroupOpen
    });
  }

  treeButtons = rowInfo => {
    const buttons = [
      <ContextMenuProvider id="menu_id" event="onClick">
        <button
          onClick={() => this.props.selectNode({...rowInfo, maxDepth: this.getMaxDepth(rowInfo.node)})}
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

  renderBetaGroupsItems = () => {
    if (this.props.betaGroups) {
      return (
        <DropdownMenu>
          {this.props.betaGroups.map( betaGroup => <DropdownItem  key ={betaGroup.id}>{betaGroup.name}</DropdownItem>)}
        </DropdownMenu>
      );
    }
    return null;
  }
  
  render () {
    //const getNodeKey = ({ treeIndex }) => treeIndex;
    return (

      <Container className="allocationTree">
        <Row className="treeHeader">
          <Col lg="3" md="3" sm="1" xs="1">
            <h5>Bose Current Tree</h5>
          </Col>

          <Col lg="5" md="5" sm="11" xs="11">
            <TreeButtonBar save={this.saveTree}  />
          </Col>

          <Col lg="4" md="4" sm="11" xs="11">
            <div className="settings">
              <Input placeholder="Global Set" />

              <Dropdown isOpen={this.state.dropdownBetaGroupOpen} toggle={this.betaGroupToggle}>
                <DropdownToggle caret>
                  Beta Group1
                </DropdownToggle>
                {this.renderBetaGroupsItems()}
              </Dropdown>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="8" sm="12" className="treecontainer">
            <SortableTree
              treeData={this.state.treeData}
              onChange={treeData => this.setState({ treeData })}
              canDrop={ ({ nextPath }) => nextPath.length > 1}
              maxDepth={Constants.maxDepth}
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
              jumpLevel={this.jumpLevel}
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
  saveAllocationTree,
  getBetaGroups,
} )(AllocationTree);
