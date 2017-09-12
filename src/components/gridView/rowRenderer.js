import React from 'react';
import ReactDataGrid from 'react-data-grid';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const { Row } = ReactDataGrid;

const RowRenderer = createReactClass({

  setScrollLeft(scrollBy) {
    // if you want freeze columns to work, you need to make sure you implement this as apass through
    this.row.setScrollLeft(scrollBy);
  },

  getRowClass() {
    return this.props.idx % 2 === 0 ? 'darkGreenRow' : 'lightGreenRow';
  },

  render () {
    // here we are just changing the style
    // but we could replace this with anything we liked, cards, images, etc
    // usually though it will just be a matter of wrapping a div, and then calling back through to the grid
    return (<div className={this.getRowClass()}><Row ref={ node => this.row = node } {...this.props}/></div>);
  }
});

RowRenderer.propTypes = {
  idx: PropTypes.number.isRequired
};

export default RowRenderer;