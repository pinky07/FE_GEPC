import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const ExpanderFormatter = createReactClass({
  render() {
    return (
      <span title={this.props.value && this.props.value.accountgroupname}>
        {this.props.value && this.props.value.accountgroupname}
      </span>
    );
  }
});

ExpanderFormatter.propTypes = {
  value: PropTypes.object.isRequired,
};
export default ExpanderFormatter;