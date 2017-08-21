import React from 'react';
import createReactClass from 'create-react-class';
//import PropTypes from 'prop-types';

const ExpanderFormatter = createReactClass({
  
  componentWillReceiveProps(nextProps) {
   console.log(nextProps);
  },

  render() {
    return (
      <span>
        {this.props.value}
      </span>
    );
  }
});
/*
ExpanderFormatter.propTypes = {
  expandableOptions: PropTypes.object.isRequired,
  onCellExpand: PropTypes.func.isRequired
};*/
export default ExpanderFormatter;