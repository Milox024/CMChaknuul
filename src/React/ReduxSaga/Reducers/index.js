import { combineReducers } from 'redux';
import home from './Home'
import {
  CLEAN_REDUCER,
  CLEAR_ADD_OR_UPDATE_EVENT,
} from './../Constants'

const appReducers = combineReducers({
  home
});


export default (state, action) => {
  
    if(action.type === CLEAN_REDUCER)
    {
      delete state.client.validateIdentificationType
    }
    if(action.type == CLEAR_ADD_OR_UPDATE_EVENT)
    {
      delete state.home.AddOrUpdateEvent
    }
    return appReducers(state, action);
  };
 