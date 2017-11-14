import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from './AutoSuggest';

class TypeFace extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='text-typeface'>
                <AutoSuggest
                    updateFontFamily = {this.props.updateFontFamily}
                    updateFontVariant = {this.props.updateFontVariant}
                    updateFontSize = {this.props.updateFontSize}
                />
            </div>
        )
    }
}

TypeFace.propsTypes = {
    
}

export default TypeFace;
