import {api} from '../api/api'
const initialState = {
  desc:""
};

export var  actiontype = {
    GET_ABOUT_DESC: "GET_ABOUT_DESC"
};

export const actions = {
    get_about_desc: function () {        
               return  (dispatch)=>{
                fetch(api.about,{
                    method: 'GET',
                    mode: 'cors',
                    header: {'content-type':'application/json; charset=utf-8'}
                }).then(res => {
                    return res.json();
                }).then(res => {
                    var state = { desc: res };
                    dispatch({
                        type: actiontype.GET_ABOUT_DESC,
                        state
                    });
                })                                               
            }              
    }     
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actiontype.GET_ABOUT_DESC:
            return {
                 ...state,
                 desc:action.state.desc
            };
        default:
            return state;
    }
}