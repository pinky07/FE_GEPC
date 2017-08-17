import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const RIGHT_TRIANGLE = String.fromCharCode('9654');
const DOWN_TRIANGLE = String.fromCharCode('9660');

const ExpanderFormatter = createReactClass({
//&#x25BC;


  getInitialState() {
    let expanded = this.props.expandableOptions && this.props.expandableOptions.expanded;
    return { expanded: expanded };
  },
  componentWillReceiveProps(nextProps) {
    let expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
    if (this.state.expanded !== expanded) {
      this.setState({expanded});
    }
  },

  onCellExpand(e) {
    this.setState({ expanded: !this.state.expanded });
    this.props.onCellExpand(e);
  },
  render() {
    return (
      <span onClick={this.onCellExpand} >
        {this.state.expanded ? DOWN_TRIANGLE : RIGHT_TRIANGLE}
      </span>
    );
  }
});

ExpanderFormatter.propTypes = {
  expandableOptions: PropTypes.object.isRequired,
  onCellExpand: PropTypes.func.isRequired
};

export default ExpanderFormatter;