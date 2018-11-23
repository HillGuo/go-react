import React from 'react'
import { Row, Col } from 'antd';

import ArticleContent from './articleContent'

import axios from 'axios';
class Article extends React.Component {

    constructor(){
        super()
        this.state={
            articleContent:null,
        }
    }

    componentWillMount(){
        const url ="http://127.0.0.1:8888/blog"
        axios.get(url).then((res)=>{
            const data = res.data;
            this.setState({articleContent:data.message})
        }).catch(e=> console.log(e))
    }

    render(){
        return(
            <Row>
                <Col span={16} offset={4}>
                <ArticleContent content={this.state.articleContent}/>
                </Col>
            </Row>
        )
    }
}

export default Article