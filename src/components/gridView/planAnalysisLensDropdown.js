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
  getPlanAnalysisLens,
} from '../../actions';

export class PlanAnalysisLensDropdown extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    }
  }

  componentDidMount () {
    this.props.getPlanAnalysisLens();
  }

  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changePlanAnalysisLens = event => {
    const plan = {
      id: parseInt(event.currentTarget.value, 10),
      name: event.currentTarget.textContent
    };
    //this.props.selectBetaGroup(group);
  }

  renderDropdownItems = () => {
    if (this.props.planAnalysisLens) {
      return (
        <DropdownMenu>
          {this.props.planAnalysisLens.map( planAnalysis => <DropdownItem  key={planAnalysis.id} value={planAnalysis.id} onClick={this.changePlanAnalysisLens}>{planAnalysis.name}</DropdownItem>)}
        </DropdownMenu>
      );
    }
    return null;
  };

  render () {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.dropdownToggle}
        className="dropdownPlanAnalysis"
      >
        <DropdownToggle caret>
          Plan Analysis Lens
        </DropdownToggle>
        {this.renderDropdownItems()}
      </Dropdown>
    );
  }
}


PlanAnalysisLensDropdown.propTypes = {
  selectedNode: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    planAnalysisLens: state.allocationGrid.planAnalysisLens,
  };
};

export default connect( mapStateToProps, {
  getPlanAnalysisLens,
} )(PlanAnalysisLensDropdown);

