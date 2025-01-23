import { fork } from 'redux-saga/effects'
import { watchRequestHomeModuleInfo, watchRequestSaveOrUpdateEvent, watchRequestUpdateStatusEvent, watchRequestUserLogin } from './Home'


export default function* rootSaga() {
   yield fork(watchRequestUserLogin) 
   yield fork(watchRequestHomeModuleInfo) 
   yield fork(watchRequestSaveOrUpdateEvent)
   yield fork(watchRequestUpdateStatusEvent)
}