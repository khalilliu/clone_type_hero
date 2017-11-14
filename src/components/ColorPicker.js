import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GithubPicker, ChromePicker } from 'react-color';
import ColorPalettes from '../colors';

export default class ColorPicker extends Component {
  constructor(props){
    super(props)
    this.state={
      textColor: props.defaults.textColor,
      defaultColor: props.defaults.defaultColor,
      showChromePicker:false,
      showGithubPicker:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.toggleChromePicker = this.toggleChromePicker.bind(this);
    this.toggleGithubPicker = this.toggleGithubPicker.bind(this)
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this)
  }
  handleChange(e){
    const newColor = e.target.value;
    this.setState({
      textColor: newColor
    })
    this.props.handleColorChange(e.target.value)
  }
  toggleChromePicker(){
    this.setState({
      showChromePicker: !this.state.showChromePicker,
      showGithubPicker:false
    })
  }
  toggleGithubPicker(){
    this.setState({
      showChromePicker: false,
      showGithubPicker: !this.state.showGithubPicker
    })
  }
  handleColorPickerChange(color){
    this.setState({
      textColor:color.hex
    })
    this.props.handleColorChange(color.hex)
  }
  
  handleClose(){
    this.setState({
      showGithubPicker:false
    })
  }
  
  render(){
    const { textColor,defaultColor,showChromePicker,showGithubPicker }= this.state;
    return(
      <div className='text-color'>
        <div 
          className='color--preview'
          style={{backgroundColor:textColor || defaultColor}}
          onClick={this.toggleGithubPicker}
        />
        <input 
          className='color--input'
          type='text'
          value={textColor}
          onChange={this.handleChange}
          onClick={this.toggleChromePicker}
        />
        { showChromePicker ?
          <div className='chrome-picker'>
            <div className='chrome-picker--cover' onClick={this.toggleChromePicker}></div>
            <ChromePicker 
              color={textColor}
              onChangeComplete={this.handleColorPickerChange}
              disableAlpha
            />
          </div>
          : ''
        }
        {
          showGithubPicker ?
            <div className='github-picker'>
              <div className='github-picker--cover' onClick={this.toggleGithubPicker}></div>
              <GithubPicker
                color={textColor}
                colors={ColorPalettes}
                onChangeComplete={this.handleColorPickerChange}
                disableAlpha
              />
            </div>
          : ''
        }
      </div>
    )
  }
}

ColorPicker.propsTypes = {
  handleColorChange:PropTypes.func.isRequired,
  defaults: PropTypes.shape({
    textColor: PropTypes.string,
    defaultColor: PropTypes.string
  }).isRequired
}