import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from 'slate-react';
import Plain from 'slate-plain-serializer';


class TextEditor extends React.Component{
  constructor(props){
    super(props)
    
    this.onChange = this.onChange.bind(this)
  }
    state = {
    value: Plain.deserialize('write something...')
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    return (
      
        <Editor
          className='text-editor'
          placeholderStyle={{color:'#aba6b1'}}
          style={this.props.editStyle}
          placeholder="Enter some plain text..."
          value={this.state.value}
          onChange={this.onChange}
          autoFocus
        />
     
    )
  }
}

export default TextEditor;