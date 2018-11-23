import {api} from '../api/api'
const initialState = {
  articleList:[],
  total:10,
  current:10
};

export const  actiontype = {
    fetchArticleListStarted: "fetchArticleListStarted",
    fetchArticleListSuccess:"fetchArticleListSuccess",
    fetchArticleLIstFailed:"fetchArticleListFailed"

};

export const actions = {
    fetchArticleListStarted: function (cls="",tag="",current=1,pageSize=10) {    
                const formData = new FormData();
                formData.append('class', cls);
                formData.append('tag', tag);
                formData.append('current', current);
                formData.append('pageSize', pageSize);
               return  (dispatch)=>{
                fetch(api.articleList,{
                    method: 'POST',
                    mode: 'cors',
                    header: {'Content-Type':'application/x-www-form-urlencoded'},
                    body:formData
                }).then(res => {
                    return res.json();
                }).then(res => {
                    dispatch({
                        type: actiontype.fetchArticleListSuccess,
                        res:res
                    });
                })                                               
            }              
    }     
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actiontype.fetchArticleListSuccess:
        console.log(action.res.data.articleList)
            return {
                 ...state,
                 articleList:[...action.res.data.articleList],
                 total:action.res.data.total,
                 current:action.res.data.current
            };
        default:
            return state;
    }
}