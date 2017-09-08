import React from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import {
  Row,
  Col,
} from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import RowRenderer from './rowRenderer';
import allocationModel from '../model/allocationModel';
import ExpanderFormatter from './colNameFormatter';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';
import BetaGroupDropdown from './betaGroupDropdown';

let columns = [
  {
    key: 'node',
    name: 'Node Name',
    width: 350,
    formatter: ExpanderFormatter
  },
  {
    key: 'assetCat',
    name: 'Asset Category',
    width: 150,
  },
  {
    key: 'newGrouping',
    name: 'New Grouping',
    width: 150,
    editable: true
  },
  {
    key: 'aamb',
    name: 'AAMB',
    width: 150,
  },
  {
    key: 'nd',
    name: 'Node',
    width: 150,
  },
  {
    key: 'alias',
    name: 'Asset Class Alias',
    width: 150,
  },
  {
    key: 'policy',
    name: 'Policy',
    width: 100,
  },
  {
    key: 'value',
    name: 'Value',
    width: 100,
  },
  {
    key: 'mixA',
    name: 'Mix A',
    width: 100,
  }
];

const AllocationGrid = createReactClass({
  getInitialState() {
    return { expanded: {}, rows: [] };
  },

  getRows(i) {
    return this.state.rows[i];
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.gridData !== this.props.gridData) {
      allocationModel().getAllocationGrid(nextProps.gridData).then(rows => {
        this.setState({
          rows,
        });
      });
    }
  },

  render() {
    return (
      <div className="allocationGrid">
        <Row>
          <Col lg="12" md="12" className="betagroupDropdown">
            <BetaGroupDropdown/>
          </Col>
        </Row>
        <Row>
          <Col lg="9" md="9" className="gridContainer">
            <ReactDataGrid
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRows}
              rowsCount={this.state.rows.length}
              minHeight={500}
              rowRenderer={RowRenderer}
              onGridRowsUpdated={this.handleGridRowsUpdated}
            />
          </Col>
          <Col lg="3" md="3">
            <MixStatistics />
            <MixDetails />
          </Col>
        </Row>
      </div>
    );
  }
});

const mapStateToProps = state => {
  return {
    ...state.allocationGrid
  };
};

export default connect(mapStateToProps, null)(AllocationGrid);
