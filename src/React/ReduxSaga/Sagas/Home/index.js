import { call, put, takeLatest } from 'redux-saga/effects'
import {
    REQUEST_HOME_MODULE_INFO, 
    RESPONSE_HOME_MODULE_INFO, 
    DATA_FETCH_FAILED,
    RESPONSE_USER_LOGIN,
    REQUEST_USER_LOGIN,
    RESPONSE_SAVE_OR_UPDATE_EVENT,
    REQUEST_SAVE_OR_UPDATE_EVENT

} from '../../Constants'
import HomeModule from '../../../../Libraries/Home'

function* requestUserLogin(data){
    try {
        const response = yield call(HomeModule.RequestUserLogin, data.payload.user);
        yield put({type: RESPONSE_USER_LOGIN, payload: { response:response }});

    } catch (error) {
        console.error("service module error", error);
        yield put({ type: DATA_FETCH_FAILED, message: error.statusText })
    }
}
function* requestHomeModuleInfo(data){
    try {
        const response = yield call(HomeModule.GetHomeModule, data.payload.guid);
        yield put({type: RESPONSE_HOME_MODULE_INFO, payload: { response:response }});

    } catch (error) {
        console.error("load home module error", error);
        yield put({ type: DATA_FETCH_FAILED, message: error.statusText })
    }
}
function* requestSaveOrUpdateEvent(data){
    try {
        const response = yield call(HomeModule.RequestSaveOrUpdateEvent, data.payload.event);
        yield put({type: RESPONSE_SAVE_OR_UPDATE_EVENT, payload: { response:response }});

    } catch (error) {
        console.error("load home module error", error);
        yield put({ type: DATA_FETCH_FAILED, message: error.statusText })
    }
}

export function* watchRequestUserLogin() {
    yield takeLatest(REQUEST_USER_LOGIN, requestUserLogin);
}
export function* watchRequestHomeModuleInfo() {
    yield takeLatest(REQUEST_HOME_MODULE_INFO, requestHomeModuleInfo);
}
export function* watchRequestSaveOrUpdateEvent() {
    yield takeLatest(REQUEST_SAVE_OR_UPDATE_EVENT, requestSaveOrUpdateEvent);
}