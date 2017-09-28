import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';
import { AgGridReact } from "ag-grid-react";
import { getAllocationGrid, getPlanAnalysisLens } from '../../actions';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';
import { columns } from './columnsDef';
import PlanAnalysisLensDropdown from './planAnalysisLensDropdown';

export class AllocationAgGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: Array.from(columns),
    }
  }

  componentDidMount () {
    //this.props.getAllocationGrid();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.gridData !== this.props.gridData) {
      this.setState({
        rows: nextProps.gridData,
      });
    }
  }
  
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    //this.gridApi.sizeColumnsToFit();
  }

  render () {

    return (
      <div className="allocationGrid">
        <Row>
          <Col lg="12" md="12">
            <PlanAnalysisLensDropdown />
          </Col>
        </Row>
        <Row>
          <Col lg="9" md="9" className="gridContainer">
            <div className="aggridcontainer ag-fresh">
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state && this.state.rows}
                onGridReady={this.onGridReady}
                headerHeight="35"
                enableSorting
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
    ...state.allocationGrid,
  };
};

export default connect(mapStateToProps, { getAllocationGrid, getPlanAnalysisLens })(AllocationAgGrid);
