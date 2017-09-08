import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'reactstrap';
import {AgGridReact} from "ag-grid-react";
import allocationModel from '../model/allocationModel';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';

let columnDefs = [
  {
    field: 'accountgroupname',
    headerName: 'Node Name',
    width: 350,
  },
  {
    field: 'assetCat',
    headerName: 'Asset Category',
    width: 150,
  },
  {
    field: 'newGrouping',
    headerName: 'New Grouping',
    width: 150,
  },
  {
    field: 'aamb',
    headerName: 'AAMB',
    width: 150,
  },
  {
    field: 'nd',
    headerName: 'Node',
    width: 150,
  },
  {
    field: 'alias',
    headerName: 'Asset Class Alias',
    width: 150,
  },
  {
    field: 'policy',
    headerName: 'Policy',
    width: 150,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 150,
  },
  {
    field: 'mixA',
    headerName: 'Mix A',
    width: 150,
    editable: true,
  },
  {
    field: 'mixB',
    headerName: 'Mix B',
    width: 150,
    editable: true,
  },
  {
    field: 'mixC',
    headerName: 'Mix C',
    width: 150,
    editable: true,
  }
];

class Aggrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnDefs
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.gridData !== this.props.gridData) {
      allocationModel().getAllocationGrid(nextProps.gridData).then(rows => { console.log(rows)
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

export default connect(mapStateToProps, null)(Aggrid);
