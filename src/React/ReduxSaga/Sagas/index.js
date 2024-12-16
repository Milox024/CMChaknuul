import { fork } from 'redux-saga/effects'
import { watchRequestHomeModuleInfo } from './Home'


export default function* rootSaga() {
   yield fork(watchRequestHomeModuleInfo) 
}