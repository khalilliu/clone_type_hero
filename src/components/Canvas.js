import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor'

const Canvas = ({fontFamily,fontSize,fontWeight,fontStyle,textColor,backgroundColor }) =>{
  const textStyle={
    fontFamily: `'${fontFamily}'`,
    fontSize: `${fontSize}px`,
    fontWeight,
    fontStyle,
    color: textColor
  };
  const canvasStyle={backgroundColor};
  return(
    <div style={canvasStyle} className='canvas'>
      <TextEditor editStyle={textStyle} />
    </div>
  )
}

Canvas.propTypes = {
  fontFamily: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  fontStyle: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}

export default Canvas;