import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import TreeView from './treeView/treeView';
import GridView from './gridView/gridView';
import { getAssetsAllocation, getAllocationTree, getAllocationGrid } from '../actions';

const TREE_VIEW_TAB = '1';
const GRID_VIEW_TAB = '2';

/**
 * Content component with Grid and Tree View tabs.
 * 
 * @author Francisco Zuñiga
 * @class Content
 * @extends {React.Component}
 */
export class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: TREE_VIEW_TAB,
    };
  };

  toggle = index => {
    if (this.state.activeTab !== index) {
      this.setState({
        activeTab: index
      });
    }
    if (index === GRID_VIEW_TAB) {
      this.props.getAllocationGrid();
    } else {
      this.props.getAllocationTree();
    }
  };
  
  componentDidMount () {
    this.props.getAssetsAllocation();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.assetsAllocation !== this.props.assetsAllocation) {
      const activeTab = nextProps.assetsAllocation.mixes.length > 0 ? GRID_VIEW_TAB : TREE_VIEW_TAB;

      if (activeTab === GRID_VIEW_TAB) {
        this.props.getAllocationGrid();
      } else {
        this.props.getAllocationTree();
      }
      this.setState({
        activeTab
      });
    }
  }

  render () {
    return (
      <Container className="content" fluid={true}>
        {this.props.isLoading ? <div className="loader"></div> : null}
        <Row>
          <Col lg="12" md="12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === TREE_VIEW_TAB ? 'active' : ''}
                  onClick={() => { this.toggle(TREE_VIEW_TAB); }}
                >
                  Tree View
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={this.state.activeTab === GRID_VIEW_TAB ? 'active' : ''}
                  onClick={() => { this.toggle(GRID_VIEW_TAB); }}
                >
                  Grid View
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={TREE_VIEW_TAB}>
                <Row>
                  <Col lg="12">
                    <TreeView />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tabId={GRID_VIEW_TAB}>
                <Row>
                  <Col lg="12">
                    <GridView />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>

          </Col>
        </Row>
      </Container>
    );
  }
}

Content.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  assetsAllocation: PropTypes.object.isRequired,
};

Content.defaultProps = {
  isLoading: false
};

const mapStateToProps = state => {
  return {
    ...state.shared
  };
};

export default connect( mapStateToProps, { getAssetsAllocation, getAllocationTree, getAllocationGrid } )(Content);
