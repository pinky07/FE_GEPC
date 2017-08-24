import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const ExpanderFormatter = createReactClass({
  render() {
    return (
      <span className="expanderFormatter" title={this.props.value}>
        {this.props.value}
      </span>
    );
  }
});

ExpanderFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};
export default ExpanderFormatter;