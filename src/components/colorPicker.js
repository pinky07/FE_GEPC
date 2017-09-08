import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const DEFAULT_COLOR_PICKER = '#002060';
const PRESET_COLORS = [
  '#a0ac1b',
  '#4d4e54',
  '#eeece1',
  '#d0d68f',
  '#a0bdc0',
  '#993300',
  '#cc9900',
  '#557d81',
  '#da7d00',
  '#fce7b2',
  '#666635',
  '#feae0e',
  '#640000',
  '#002060',
];

export default class ColorPicker extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      selectedColor: DEFAULT_COLOR_PICKER,
      presetColors: PRESET_COLORS,
    };
  }

  onClickColorPicker = () => {
    if (!this.props.disabled) {
      this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }
  };

  onClose = () => {
    this.props.changeColor(this.state.selectedColor);
    this.setState({ displayColorPicker: false });
  };

  onChangeColor = color => {
    this.setState({ selectedColor: color.hex });
  };

  renderPicker () {
    if (this.state.displayColorPicker) {
      return (
        <div className="popover">
          <div className="cover" onClick={ this.onClose }/>
          <SketchPicker
            color={ this.state.selectedColor }
            onChange={ this.onChangeColor }
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
          background: this.state.selectedColor,
        },
      },
    });

    return (
      <div className="colorPicker">
        <div onClick={ this.onClickColorPicker }>
          <div className="color" style={ styles.color } />
        </div>
        { this.renderPicker() }
      </div>
    )
  }
}
