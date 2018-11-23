import React from 'react'
import { Row, Col } from 'antd';

import Article from './article'

class Content extends React.Component {
    render(){
        return(
            <Row>
                <Col span={16} offset={4}>
                    <Article/>                    
                </Col>
            </Row>
        )
    }
}

export default Content