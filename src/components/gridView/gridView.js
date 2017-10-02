import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';
import { AgGridReact } from "ag-grid-react";
import {
  getPlanAnalysisLens,
  selectPlanAnalysis,
} from '../../actions';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';
import { columns } from './columnsDef';
import Select from 'react-select';

export class AllocationAgGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      columnDefs: Array.from(columns),
      selectedPlanAnalysis: undefined,
      selectedAliasSelector: undefined
    }
  }

  componentDidMount () {
    this.props.getPlanAnalysisLens();
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
  }

  changePlanAnalysisLens = plan => {
    this.props.selectPlanAnalysis(plan);
    this.setState({ selectedPlanAnalysis: plan })
  };

  render () {

    return (
      <div className="gridView">
        <Row>
          <Col lg="12" md="12">
            <Select
              searchable
              clearable={false}
              value={this.state.selectedPlanAnalysis}
              onChange={this.changePlanAnalysisLens}
              options={this.props.planAnalysisLens}
              className="dropdownPlanAnalysis"
              labelKey="name"
              valueKey="id"
              placeholder="Plan Analysis Lens"
            />
          </Col>
        </Row>

        <Row>
          <Col lg="9" md="9" className="">
            <div className="gridContainer ag-fresh">
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rows}
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

export default connect(mapStateToProps, {
  getPlanAnalysisLens,
  selectPlanAnalysis,
})(AllocationAgGrid);
