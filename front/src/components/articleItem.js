import React, { Component } from 'react'
import { Avatar } from 'antd';
import {Icon, Tag } from 'antd';
import { Row, Col } from 'antd';
const title = "标题"
const content = "随便在你存放文件的目录下执行，这里解释一下，由于这个mysql的yum源服务器在国外所以下载速度会比较慢sql5.7的原因"

var articleItemStyle = {
    margin: 20,
}

class ArticleItem extends Component {
    render() {
        return (
            <div style={articleItemStyle}>
                <Row>
                    <Col span={12}>
                        <Row style={{marginBottom:10,}}>{title}</Row>
                        <Row  style={{marginBottom:10,}}>
                            <Tag color="#f50">#f50</Tag>
                            <Tag color="#2db7f5">#2db7f5</Tag>
                            <Tag color="#87d068">#87d068</Tag>
                            <Tag color="#108ee9">#108ee9</Tag>
                        </Row>
                    </Col>
                    <Col span={12}><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Col>
                </Row>
                <Row >
                    <Col style={{marginBottom:10,}} span={24}> {content}</Col>
                    <Col style={{textAlign:'left', color:'#f50',fontSize: 18}}>
                        <Icon type="eye-o" style={{ fontSize: 18, color: '#08c' ,}} />99
                        <Icon type="like-o" style={{ fontSize: 18, color: '#88c' ,marginLeft:10,}} />10
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ArticleItem