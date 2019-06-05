import { createStore, applyMiddleware, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as R from 'ramda'

import rootReducer from './root-reducer'
import allSagas from './root-saga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middlewares: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension') // eslint-disable-line @typescript-eslint/no-var-requires
    return composeWithDevTools(applyMiddleware(...middlewares))
  }
  return applyMiddleware(...middlewares)
}

export function configureStore() {
  const middlewares: Middleware[] = [sagaMiddleware]

  const store = createStore(rootReducer, bindMiddleware(middlewares))

  R.forEach(saga => sagaMiddleware.run(saga), allSagas)

  return { store }
}
