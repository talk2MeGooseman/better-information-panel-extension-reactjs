import React from 'react'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'
import { PropTypes } from 'prop-types';

class ColorPicker extends React.Component {
  static defaultProps = {
    color: '#000000',
  };

  propTypes = {
    handleChange: PropTypes.func.isRequired,
  };

  state = {
    displayColorPicker: false,
    color: '#000000',
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.props.color}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker color={ this.props.color } disableAlpha={true} onChange={ this.props.handleChange } />
        </div> : null }

      </div>
    )
  }
}

export default ColorPicker
