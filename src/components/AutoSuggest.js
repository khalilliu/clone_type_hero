import React, { Component } from 'react';
import AutoSuggest from 'react-autosuggest';
import WebFont from 'webfontloader';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';
import FontSize from './FontSize';


const appId = '36V5WPB9MK';
const apiKey = 'f7fa3eaa0a43d631a55afb811f071efd';
const indexName = 'google_fonts';

const client = algoliasearch(appId,apiKey);
const index = client.initIndex(indexName);

class Algo extends Component{
    static fetchFont(fontFamily, fontVariants){
        const fontRequest =`${fontFamily}:${fontVariants}`;
        WebFont.load({
            google:{
                families: [ fontRequest ]
            }
        })
    }
    
    static generateVariants(variants){
        const fontVariants = variants.map((variant, vindex)=>{
            return(
            <option
              value={ JSON.stringify(variant) }
              key={vindex}>
                {variant.weight} {variant.style}
            </option>
            )
        })
        return fontVariants;
    }
   
   static formatVariants(variants){
       const formatted = variants.map((variant)=>{
           const fontInfo = {};
           fontInfo.weight = parseInt(variant.match(/\d+/) ? variant.match(/\d+/)[0] : 400, 10);
            let style  = variant.match(/[A-Za-z]/g);
            style  = style ? style.join('') : '';
            style = (style == 'regular') ? '' : style ; 
            fontInfo.style = style;
            return fontInfo;
       })
       return formatted;
       console.log(formatted)
   } 
   
   static getFontWeights(variants){
       const variantsString = variants.join(',');
       return variantsString;
   }
   
   constructor(props){
       super(props);
       this.state = {
           isLoading : true,
           errorHappend: false,
           value : '',
           suggestions : [{ family : 'Loading' }] ,
           selectedFontVariants : [],
           fontSize : '24',
       };
       this.handleChange = this.handleChange.bind(this);
       this.onSuggestionsClearRequested=this.onSuggestionsClearRequested.bind(this);
       this.updateSuggestions=this.updateSuggestions.bind(this);
       this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
       this.updateFontVariant = this.updateFontVariant.bind(this);
       this.updateFontSize = this.updateFontSize.bind(this);
   }
   
   componentDidMount(){
       this.updateSuggestions({ value : '' })
   }
   
   onSuggestionSelected(event, { suggestion , suggestionValue }){
       const variants = suggestion.variants 
        ?   suggestion.variants
        :   [];
      const formattedVariants= Algo.formatVariants(variants);
      this.setState({ selectedFontVariants : formattedVariants });
      const variantsString = Algo.getFontWeights(variants);
      Algo.fetchFont(suggestionValue, variantsString);
      this.props.updateFontFamily(suggestionValue);
   }
   
   onSuggestionsClearRequested(){
       this.setState({
           suggestions:[]
       })
   }
   
   handleChange(event,{newValue}){
       this.setState({
           value: newValue
       })
   }
   
   updateSuggestions(searchObj){
       index.search(searchObj.value,(err,content)=>{
           if(err){
               this.setState({
                 errorHappend: true,
                 isLoading:false
               })
               return;
           }
           this.setState({
               isLoading:false,
               suggestions: content.hits
           })
       })
   }
   
   updateFontVariant(event){
       const value = event.target.value;
       const variant = JSON.parse(value);
       this.props.updateFontVariant(variant);
   }
   
   updateFontSize(event){
       const fontSize = event.target.value;
       this.setState({
           fontSize
       });
      
       let santizedFontSize=parseInt(fontSize,10);
       santizedFontSize = !santizedFontSize ? 34 : santizedFontSize;
       
       this.props.updateFontSize(santizedFontSize);
   }
   
   render(){
       const {isLoading, errorHappend, value, suggestions, selectedFontVariants, fontSize} = this.state;
       const variants = Algo.generateVariants(selectedFontVariants);
       
       let selectVariants = '';
       let defaultValues = [
            {
                weight: 400,
                style: 'normal'
            },
            {
                weight:700,
                style:'normal'
            }
           ];
        defaultValues = defaultValues.map((val,index)=>{
            <option value={JSON.stringify(val)} 
                key={val.weight + val.style}>
                { val.weight }
            </option>
        })
    
       selectVariants =(
            <select onChange={this.updateFontVariant}>
                { defaultValues }
                { variants }
            </select>   
        )
        
        return(
            <div>
                {errorHappend 
                ? <div className='error'>Refresh the page.</div>
                : <div className='no-error'>
                    {
                        isLoading 
                          ? <p>Loading font...</p> 
                          : <div>
                            <AutoSuggest
                              suggestions={suggestions}
                              onSuggestionsFetchRequested={this.updateSuggestions}
                              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                              onSuggestionSelected={this.onSuggestionSelected}
                              getSuggestionValue={typeface => typeface.family}
                              shouldRenderSuggestions={()=>true}
                              highlightFirstSuggestion
                              renderSuggestion={typeface =>{
                               return(
                               <div>
                                 <div>{typeface.family}</div>
                               </div>)   
                              }}
                              inputProps={{
                                  placeholder:'Search Google fonts',
                                  value,
                                  onChange: this.handleChange
                              }}
                            />
                          </div>
                    }
                  </div>  
                }
                <div className='variants'>
                    {selectVariants}
                </div>
                <FontSize defaultFontSize={fontSize} onChange={this.updateFontSize} />
            </div>
        )
   }
}

Algo.propTypes = {
  updateFontFamily: PropTypes.func.isRequired,
  updateFontVariant: PropTypes.func.isRequired,
  updateFontSize: PropTypes.func.isRequired,
};

export default Algo;