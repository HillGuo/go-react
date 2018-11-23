import React from 'react'

import {connect} from 'react-redux';
import { Carousel } from 'antd';

import style from './about.css'


class About extends React.Component {
    render(){
        return(
            
            <Carousel autoplay className={style.antcarousel}   >
            <img  alt="img" src="https://avatars2.githubusercontent.com/u/3403295?s=60&v=4"/>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>400</h3></div>
            </Carousel>
        )
    }
}

function mapStateToProps(state){
    return {
        desc: state.about.desc
    }
}

function mapDispatchToProps(dispatch) {
    return {
       // get_article_list: bindActionCreators(get_article_list, dispatch),
        //get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About);