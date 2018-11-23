import React, { Component } from 'react'
import {BrowserRouter ,Switch, Route } from 'react-router-dom'

import {connect} from 'react-redux';

import About from './about/about'
import Home from './home/home'
import Article from '../components/article'
import Login from '../containers/login/modal'
import 'antd/dist/antd.css';
import './about/about.css'

class App extends Component {

  componentWillMount(){
    
    var strCookie = document.cookie;
    alert(strCookie)
    var arrCookie = strCookie.split(";");
    for(var i=0; i<arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        alert(arr[0]+"a")
        alert(arr[1]+"a")
        if(arr[0].trim() == "cookie-name"){
          alert(arr[1])
        }
           
    }
   
    
  }
  render() {
    return (
        <BrowserRouter  >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/article" component={Article} />
              <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter >
    )
  }
}

function mapStateToProps(state) {
  return {
    //userInfo: state.globalState.userInfo,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    //user_auth: bindActionCreators(user_auth, dispatch),
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);