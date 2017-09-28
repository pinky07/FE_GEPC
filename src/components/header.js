import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';

import {
  save,
} from '../actions';

/**
 * Header component with Segment, Client and Plan.
 * 
 * @author Francisco Zuñiga
 * @author Rubén Jiménez
 * @class Header
 * @extends {React.Component}
 */
export class Header extends React.Component {

  /**
   * Saves everything displayed in the application to the backend by dispatching an action.
   * 
   * @memberof Header
   */
  save = event => {
    console.log("Save button clicked!");
    this.props.save();
  }

  /**
   * Displays help information.
   * 
   * @memberof Header
   */
  help = event => {
    console.log("Help button clicked!");
  }

  /**
   * Renders this component
   * 
   * @returns Rendered HTML
   * @memberof Header
   */
  render() {
    const { segment } = this.props
    const { client } = this.props
    const { plan } = this.props

    return (
      <div className="app-header">
        <Container fluid>
          <Row>
            <Col xs="12" md="2" className="vcenter-parent text-left">
              <p className="vcenter">NEPC Tree View</p>
            </Col>
            <Col xs="12" md="8" className="vcenter-parent text-center">
              <p className="vcenter">Segment: <span>{segment}</span> Client: <span>{client}</span> Plan: <span>{plan}</span></p>
            </Col>
            <Col xs="12" md="2" className="text-right">
              <Button color="primary" className="btn-save" onClick={this.save}>Save</Button>
              <Button color="primary" className="btn-help" onClick={this.help}>Help</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

/**
 * Maps relevant properties to this component from the store.
 * 
 * @param {*} state 
 */
const mapStateToProps = state => {
  return {
    ...state.spotFire
  };
};

/**
 * Connects this component to Redux
 */
export default connect(
  mapStateToProps,
  {
    save,
  }
)(Header);