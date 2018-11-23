import React, { Component } from 'react'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ArticleItem from './articleItem'
import {Pagination} from 'antd'

import {actions} from '../../reducers/articleListReducer'



class ArticleList extends Component {

    constructor(props){
        super(props)
        this.changePage=this.changePage.bind(this)
    }
    componentWillMount(){
        this.props.fetchArticleListStarted()
    }
    render(){
        const listItems = this.props.articleList.map((article,index)=>{
            return  <ArticleItem key={index} article={article}/>
        })
        return(
            <div>
                {listItems}
            <div style={{textAlign:'center', margin:20}}>
            <Pagination  onChange={this.changePage} total={this.props.total} />
            </div>
            </div>
        )
    }

    changePage(current){
        
        this.props.fetchArticleListStarted("","",current)
    }
}

function mapStateToProps(state){
    return {
        total: state.article.total,
        current:state.article.current,
        articleList:state.article.articleList
       // pageNum: state.front.pageNum,
       // total: state.front.total,
       // articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchArticleListStarted: bindActionCreators(actions.fetchArticleListStarted, dispatch),
        //get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);