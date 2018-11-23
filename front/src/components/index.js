
import React, { Component } from "react"
import { render } from 'react-dom'


import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {action1,action2} from '../actions/index'

export class Index extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
      
    }

    render() {
        return <div/>

    }
}
const mapStateToProps = (state) => {
    return { articlelist: state.articlelist }
}
const mapDispatchToProps = (dispatch) => {
    return {
       actions: bindActionCreators(action1, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)