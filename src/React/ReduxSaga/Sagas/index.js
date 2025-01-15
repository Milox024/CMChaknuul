import { fork } from 'redux-saga/effects'
import { watchRequestHomeModuleInfo, watchRequestSaveOrUpdateEvent, watchRequestUserLogin } from './Home'


export default function* rootSaga() {
   yield fork(watchRequestUserLogin) 
   yield fork(watchRequestHomeModuleInfo) 
   yield fork(watchRequestSaveOrUpdateEvent)
}