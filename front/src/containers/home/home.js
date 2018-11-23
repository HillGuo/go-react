import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {Row,Col} from 'antd';
import { Layout, Menu, Icon } from 'antd';
import  style from './home.css'
import {menu} from './style'
import {actions} from '../../reducers/aboutReducer'

import ArticleList from '../articles/articleList'
import Tags from '../tags/tags'

const { Header, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class Home extends Component{

  constructor(props){
    super(props)
    this.githubLogin=this.githubLogin.bind(this)
  }
    componentDidMount(){
      this.props.get_about_desc()
    }
    render(){
      console.log(this.props.desc)
        return (
        <Layout>
       
        <Header style={{ backgroundColor: 'rgb(255, 255, 255)', height: 100}} >
        <Row>
        <Col span={20}>
          <Menu style={menu}  mode="horizontal">
            <Menu.Item style={{ paddingLeft: 200 }} >
           
            </Menu.Item>

            <Menu.Item key="home" >
              <Link to="/"><Icon type="home" />主页</Link>
            </Menu.Item>

            <SubMenu title={<span><Icon type="setting" />分类</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1"><Link to="/article">Option 1</Link></Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <Link to="/about">关于 </Link>
            </Menu.Item>
          </Menu>
          </Col>
          <Col>
          <Icon onClick={this.githubLogin} type="github" style={{fontSize:32,marginTop:25}} />
          </Col>
          </Row>
        </Header>

        <Layout style={{ backgroundColor: 'rgb(255, 255, 255)',minHeight: 650}} >
        <Row>
                <Col span={12} offset={4}>
                    <ArticleList/>         
                </Col>
                <Col span={4} offset={2}>
                <Tags/>
                </Col>
            </Row>
        </Layout>

        <Footer className={style.appfoot} style={{  backgroundColor: 'rgb(255, 255, 255)'}}>
          Blog Design ©2018 Created by h2san
        </Footer>
      </Layout>
        )
    }
    githubLogin(){
      let popWin = window.location.href= 'https://github.com/login/oauth/authorize?client_id=d21f89d63e0cc1368a0a&scope=user'
    }
    
}

Home.defaultProps ={
    userInfo:{},
    pageNum:1,
    total:0,
    articleList:[]
};
Home.propsType = {
    pageNum: PropTypes.number,
    total: PropTypes.number,
    articleList: PropTypes.array
};

function mapStateToProps(state){
    return {
        desc: state.about.desc,
       // pageNum: state.front.pageNum,
       // total: state.front.total,
       // articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
      get_about_desc: bindActionCreators(actions.get_about_desc, dispatch),
      //githubLogin:bindActionCreators(loginActions.githubLogin,dispatch)
        //get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);