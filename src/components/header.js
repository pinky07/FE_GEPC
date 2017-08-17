import React from 'react';
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  Container,
} from 'reactstrap';

export  default class Header extends React.Component {
  
  toggle = () => {}

  render () {
    return (
      <div className="app-header">
        <Container fluid>
          <Row>
            <Col lg="2" md="2">
              Segment:
              <Dropdown isOpen={false} toggle={this.toggle}>
                <DropdownToggle caret>
                  Segment 1
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="2" md="2">
              Client:
              <Dropdown isOpen={false} toggle={this.toggle}>
                <DropdownToggle caret>
                  Bose
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="4" md="4">
              Plan:
              <Dropdown isOpen={false} toggle={this.toggle}>
                <DropdownToggle caret>
                  Bose Corporation Employees’ Retirement Plan
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="2" md="2">
              As of:
              <Dropdown isOpen={false} toggle={this.toggle}>
                <DropdownToggle caret>
                   8/17/2017
                </DropdownToggle>
              </Dropdown>
            </Col>

            <Col lg="2" md="2">
              Context:
              <Dropdown isOpen={false} toggle={this.toggle}>
                <DropdownToggle caret>
                  Context 1
                </DropdownToggle>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}