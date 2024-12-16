import { combineReducers } from 'redux';
import home from './Home'
import {
  CLEAN_REDUCER,
} from './../Constants'

const appReducers = combineReducers({
  home
});


export default (state, action) => {
  
    if(action.type === CLEAN_REDUCER)
    {
      delete state.client.validateIdentificationType
    }
    return appReducers(state, action);
  };
 