import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import Constants from '../services/constants';

export default class ColorPicker extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      background: Constants.colorPickerDefault,
      presetColors: Constants.presetColors,
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ background: color.hex });
  };

  renderPicker () {
    if (this.state.displayColorPicker) {
      return (
        <div className="popover">
          <div className="cover" onClick={ this.handleClose }/>
          <SketchPicker
            color={ this.state.background }
            onChange={ this.handleChange }
            presetColors={ this.state.presetColors }
          />
        </div>
      );
    }
    return null;
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          background: this.state.background,
        },
      },
    });

    return (
      <div className="colorPicker">
        <div onClick={ this.handleClick }>
          <div className="color" style={ styles.color } />
        </div>
        { this.renderPicker() }
      </div>
    )
  }
}
