import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';
import {AgGridReact} from "ag-grid-react";
import allocationModel from '../../model/gridModel';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';
import { columns } from './columnsDef';

class allocationAgGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: Array.from(columns)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.gridData !== this.props.gridData) {
      allocationModel().getGrid(nextProps.gridData).then(rows => {
        this.setState({
          rows,
        });
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  render () {

    return (
      <div className="allocationGrid">
        <Row>
          <Col lg="9" md="9" className="gridContainer">
            <div className="aggridcontainer ag-fresh">
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state && this.state.rows}
                onGridReady={this.onGridReady}
                headerHeight="35"
              />
            </div>
          </Col>
          <Col lg="3" md="3">
            <MixStatistics />
            <MixDetails />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.allocationGrid
  };
};

export default connect(mapStateToProps, null)(allocationAgGrid);
