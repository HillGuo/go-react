import {combineReducers} from 'redux'

import front from './frontReducer';
import about from './aboutReducer';
import article from './articleListReducer';
import tag from './tagReducer';

export default combineReducers({
    front,
    about,
    article,
    tag
})