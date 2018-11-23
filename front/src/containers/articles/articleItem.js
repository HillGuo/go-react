import React, { Component } from 'react'
import { Avatar } from 'antd';
import {Icon, Tag } from 'antd';
import { Row, Col } from 'antd';


var articleItemStyle = {
    margin: 20,
}
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
class ArticleItem extends Component {
    render() {
      
        return (
            <div style={articleItemStyle}>
                <Row>
                    <Col span={12}>
                        <Row style={{marginBottom:10,}}>{this.props.article.title}</Row>
                        <Row  style={{marginBottom:10,}}>
                            {this.props.article.tags.map((tag,index)=>
                                <Tag  key={index} color={getRandomColor()}>{tag}</Tag>
                            )}
                        </Row>
                    </Col>
                    <Col span={12}><Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Col>
                </Row>
                <Row >
                    <Col style={{marginBottom:10,}} span={24}> {this.props.article.desc}</Col>
                    <Col style={{textAlign:'left', color:'#f50',fontSize: 18}}>
                        <Icon type="eye-o" style={{ fontSize: 18, color: '#08c' ,}} />{this.props.article.eye}
                        <Icon type="like-o" style={{ fontSize: 18, color: '#88c' ,marginLeft:10,}} />{this.props.article.good}
                    </Col>
                </Row>
            </div>
        )
    }

}
ArticleItem.defaultProps ={
    article:{
        tags:[]
    }
};
export default ArticleItem