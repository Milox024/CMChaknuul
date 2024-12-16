import { call, put, takeLatest } from 'redux-saga/effects'
import {
    REQUEST_HOME_MODULE_INFO, 
    RESPONSE_HOME_MODULE_INFO, 
    DATA_FETCH_FAILED

} from '../../Constants'
import HomeModule from '../../../../Libraries/Home'

function* requestHomeModuleInfo(){
    try {
        const response = yield call(HomeModule.GetHomeModule);
        yield put({type: RESPONSE_HOME_MODULE_INFO, payload: { response:response }});

    } catch (error) {
        console.error("load home module error", error);
        yield put({ type: DATA_FETCH_FAILED, message: error.statusText })
    }
}

export function* watchRequestHomeModuleInfo() {
    yield takeLatest(REQUEST_HOME_MODULE_INFO, requestHomeModuleInfo);
}