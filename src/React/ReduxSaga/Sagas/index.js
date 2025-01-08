import { fork } from 'redux-saga/effects'
import { watchRequestHomeModuleInfo, watchRequestUserLogin } from './Home'


export default function* rootSaga() {
   yield fork(watchRequestUserLogin) 
   yield fork(watchRequestHomeModuleInfo) 
}