import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import {
  getBetaGroups,
  selectBetaGroup,
} from '../actions';

export class BetaGroupDropdown extends React.Component {

  static defaultProps = {
    selectedBetaGroup: {
      id: -1,
      name: 'Beta Groups'
    }
  };

  constructor (props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    }
  }

  componentDidMount () {
    this.props.getBetaGroups();
  }

  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeBetaGroup = event => {
    const group = {
      id: parseInt(event.currentTarget.value, 10),
      name: event.currentTarget.textContent
    };
    this.props.selectBetaGroup(group);
  }

  renderDropdownItems = () => {
    if (this.props.betaGroups) {
      return (
        <DropdownMenu>
          {this.props.betaGroups.map( betaGroup => <DropdownItem  key={betaGroup.id} value={betaGroup.id} onClick={this.changeBetaGroup}>{betaGroup.name}</DropdownItem>)}
        </DropdownMenu>
      );
    }
    return null;
  }

  render () {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.dropdownToggle}
      >
        <DropdownToggle caret>
          {this.props.selectedBetaGroup.name}
        </DropdownToggle>
        {this.renderDropdownItems()}
      </Dropdown>
    );
  }
}


BetaGroupDropdown.propTypes = {
  selectedNode: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    selectedBetaGroup: state.allocationTree.selectedBetaGroup,
    betaGroups: state.allocationTree.betaGroups,
  };
};

export default connect( mapStateToProps, {
  getBetaGroups,
  selectBetaGroup,
} )(BetaGroupDropdown);

