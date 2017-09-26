import React from 'react';
import {
  Row,
  Col,
  Container,
} from 'reactstrap';

export default class Header extends React.Component {

  render () {
    return (
      <div className="app-header">
        <Container>
          <Row>
            <Col lg="1" md="1">
              NEPC Tree View
            </Col>
            <Col lg="4" md="4" className="test">
              Segment: Segment 1
            </Col>

            <Col lg="2" md="2" className="test">
              Client: Bose
            </Col>

            <Col lg="5" md="5" className="test">
              Plan: Bose Corporation Employees’ Retirement Plan
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}