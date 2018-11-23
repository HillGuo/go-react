import React, { Component } from 'react'

import ArticleItem from './articleItem'

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <ArticleItem/>
);
class ArticleList extends Component {
    render(){
        return(
            <div>
            {listItems}
            </div>
        )
    }
}

export default ArticleList