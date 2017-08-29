import React from 'react';
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  Container,
} from 'reactstrap';

export default class Header extends React.Component {
  
  toggle = () => {}

  render () {
    return (
      <div className="app-header">
        <Container>
          <Row>
            <Col lg="4" md="4" className="test">
              Segment:
              <Dropdown isOpen={false} toggle={this.toggle} size="sm">
                <DropdownToggle caret>
                  Segment 1
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="2" md="2" className="test">
              Client:
              <Dropdown isOpen={false} toggle={this.toggle}  size="sm">
                <DropdownToggle caret>
                  Bose
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="5" md="5" className="test">
              Plan:
              <Dropdown isOpen={false} toggle={this.toggle}  size="sm">
                <DropdownToggle caret>
                  Bose Corporation Employees’ Retirement Plan
                </DropdownToggle>
              </Dropdown>

            </Col>
            <Col lg="1" md="1">
              <span className="glyphicon glyphicon-search"></span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}