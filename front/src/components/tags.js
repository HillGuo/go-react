import React, { Component } from 'react'
import {Row,Col} from 'antd';

import {  Tag } from 'antd';


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

const testTags =["go","java","cpp","c","git","linux","docker"]
class Tags extends Component {
   
      
    render() {
        return (
            <Row style={{height:200, borderStyle:'solid',borderWidth:'1px',borderColor:'rgb(240,240,240)'}}>
                <Col  style={{padding:5}} span={24}>Tags:</Col>
                <Col>
                    {testTags.map((tag) =>
                    <Tag style={{margin:5,fontSize:16}} color={getRandomColor()}>{tag}</Tag>
                    )}
                   
                </Col>
            </Row>
        )
    }
}

export default Tags