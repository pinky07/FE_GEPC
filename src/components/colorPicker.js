import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class ColorPicker extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: '0',
        g: '32',
        b: '96',
        a: '1',
      },
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  renderPicker () {
    if (this.state.displayColorPicker) {
      return (
        <div className="popover">
          <div className="cover" onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div>
      );
    }
    return null;
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
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
