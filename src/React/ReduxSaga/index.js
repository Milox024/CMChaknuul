import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import appReducers from './Reducers'
import rootSaga from './Sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    appReducers,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga)  
  