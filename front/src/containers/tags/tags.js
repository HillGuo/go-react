import React, { Component } from 'react'

import {Row,Col} from 'antd';
import { Icon,Tag } from 'antd';
import {actions} from '../../reducers/tagReducer'
import {actions as articleActions} from '../../reducers/articleListReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const colorn =['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
function getRandomColor(){
    let strcolor="#"
    for (let i=0;i<6;i++)
    {
        let n=Math.floor(Math.random()*15)
        strcolor=strcolor+colorn[n]
    }
  return strcolor
}


class Tags extends Component {
   
    constructor(props){
        super(props)
        this.fresh = this.fresh.bind(this);
        this.clickTag = this.clickTag.bind(this);
    }
    componentWillMount(){
        this.props.fetchTagsStarted();
    }  
    render() {
        return (
            <Row style={{minHeight:200, borderStyle:'solid',borderWidth:'1px',borderColor:'rgb(240,240,240)'}}>
                <Col  style={{padding:5}} span={20}>Tags:</Col>
                <Col  style={{padding:5}} span={4}><Icon type="sync"  onClick={this.fresh} /></Col>
                <Col>
                    {this.props.tags.map((tag) =>
                    <Tag onClick={this.clickTag.bind(this, tag)} key={getRandomColor()} style={{margin:5,fontSize:16}} color={getRandomColor()}>{tag}</Tag>
                    )}
                   
                </Col>
               
            </Row>
        )
    }
    clickTag(tag){
        this.props.fetchArticleListStarted("",tag,1)
    }

    fresh(){
        this.props.fetchTagsStarted();
    }
}

function mapStateToProps(state){
    return {
        tags: state.tag.tags
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTagsStarted: bindActionCreators(actions.fetchTagsStarted, dispatch),
        fetchArticleListStarted:bindActionCreators(articleActions.fetchArticleListStarted,dispatch)
        //get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tags);