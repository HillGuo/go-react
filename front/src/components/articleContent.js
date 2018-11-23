import React from 'react';

import PropTypes from 'prop-types';

import Highlight from 'react-highlight'
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css'


export default class ArticleContent extends React.Component {
  
   
    render(){
       
         return (
            <div>
                <div style={{textAlign:'center',margin:10,}}>
                    <h2>{this.props.title}</h2>
                    <h4>{this.props.time.split('T')[0]}</h4>
                    
                </div>
                <Highlight innerHTML={true}>
                {this.props.content ? marked(this.props.content) : ''}
                </Highlight>
               
            </div>
          
        )
    }

}
ArticleContent.defaultProps={
    title:"JavaScript复制内容到剪贴板",
    content:"xx",
    time:"2018-03-07T03:53:43Z"
}
ArticleContent.protoType ={
    content:PropTypes.string,
    title:PropTypes.string,
    time: PropTypes.string,
}