import React from 'react'
import { Row, Col } from 'antd';
import ArticleList from './articleList'

class Home extends React.Component {
    render(){
        return(
            <Row>
                <Col span={12} offset={4}>
                    <ArticleList/>                    
                </Col>
                <Col span={4} offset={2}>
                <Tags/>
                </Col>
            </Row>
        )
    }
}

export default Home