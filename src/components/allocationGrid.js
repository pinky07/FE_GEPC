import React from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import RowRenderer from './rowRenderer';
import allocationModel from '../model/allocationModel';
import ExpanderFormatter from './expanderFormatter';
import MixDetails from './mixDetails';
import MixStatistics from './mixStatistics';

let columns = [
  {
    key: 'accountgroupname',
    name: 'Node',
    width: 450,
    formatter: ExpanderFormatter
  },
  {
    key: 'policyTotal',
    name: 'Policy',
    width: 100,
    cellClass: 'numericCell'
  },
  {
    key: 'actual_mv',
    name: 'Actual',
    width: 150,
    cellClass: 'numericCell'
  },
  {
    key: 'mixA',
    name: 'Mix A',
    width: 100,
    editable: true
  }
];

const AllocationGrid = createReactClass({
  getInitialState() {
    return { expanded: {}, rows: [] };
  },

  getRows(i) {
    return this.state.rows[i];
  },

  getSubRowDetails(rowItem) {
    let isExpanded = this.state.expanded[rowItem.accountgroupname] ? this.state.expanded[rowItem.accountgroupname] : false;
    return {
      group: rowItem.children && rowItem.children.length > 0,
      expanded: isExpanded,
      children: rowItem.children,
      field: 'accountgroupname',
      treeDepth: rowItem.treeDepth || 0,
      siblingIndex: rowItem.siblingIndex,
      numberSiblings: rowItem.numberSiblings
    };
  },

  onCellExpand(args) {
    let rows = this.state.rows.slice(0);
    let rowKey = args.rowData.accountgroupname;
    let rowIndex = rows.indexOf(args.rowData);
    let subRows = args.expandArgs.children;

    let expanded = Object.assign({}, this.state.expanded);
    if (expanded && !expanded[rowKey]) {
      expanded[rowKey] = true;
      this.updateSubRowDetails(subRows, args.rowData.treeDepth);
      rows.splice(rowIndex + 1, 0, ...subRows);
    } else if (expanded[rowKey]) {
      expanded[rowKey] = false;
      rows.splice(rowIndex + 1, subRows.length);
    }

    this.setState({ expanded: expanded, rows: rows });
  },

  updateSubRowDetails(subRows, parentTreeDepth) {
    let treeDepth = parentTreeDepth || 0;
    subRows.forEach((sr, i) => {
      sr.treeDepth = treeDepth + 1;
      sr.siblingIndex = i;
      sr.numberSiblings = subRows.length;
    });
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
      <Container className="allocationGrid">
        <br/>
        <Row>
          <Col lg="9" md="9">
            <ReactDataGrid
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.getRows}
              rowsCount={this.state.rows.length}
              getSubRowDetails={this.getSubRowDetails}
              minHeight={500}
              rowRenderer={RowRenderer}
              onCellExpand={this.onCellExpand}
              onGridRowsUpdated={this.handleGridRowsUpdated}
            />
          </Col>
          <Col lg="3" md="3">
            <MixStatistics />
            <MixDetails />
          </Col>
        </Row>
      </Container>
    );
  }
});

const mapStateToProps = state => {
  return {
    ...state.allocationGrid
  };
};

export default connect(mapStateToProps, null)(AllocationGrid);
