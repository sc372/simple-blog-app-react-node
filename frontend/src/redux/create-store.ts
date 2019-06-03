import { createStore, applyMiddleware, Middleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
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

  // const persistConfig = {
  //   key: 'root',
  //   storage,
  //   blacklist: [],
  // }

  // const persistedReducer = persistReducer(persistConfig, rootReducer)

  // const store = createStore(persistedReducer, bindMiddleware(middlewares))
  const store = createStore(rootReducer, bindMiddleware(middlewares))

  // const persistor = persistStore(store)

  R.forEach(saga => sagaMiddleware.run(saga), allSagas)

  // return { store, persistor }
  return { store }
}
