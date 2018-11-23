import {api} from '../api/api'
const initialState = {
  isLogined:false,
  user:null
};

export const  actiontype = {
    fetchTagsStarted: "fetchTagsStarted",
    fetchTagsSuccess:"fetchTagsSuccess",
    fetchTagsFailed:"fetchTagsFailed"

};

export const actions = {
    fetchTagsStarted: function () {        
               return  (dispatch)=>{
                fetch(api.tags,{
                    method: 'GET',
                    mode: 'cors',
                    header: {'content-type':'application/json; charset=utf-8'}
                }).then(res => {
                    return res.json();
                }).then(res => {
                    dispatch({
                        type: actiontype.fetchTagsSuccess,
                        res:res
                    });
                })                                               
            }              
    }     
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actiontype.fetchTagsSuccess:
        console.log(action.res.data.tags)
            return {
                 ...state,
                 tags:[...action.res.data.tags]
            };
        default:
            return state;
    }
}

export function githubLogin(){
    
}