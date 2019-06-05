import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { configureStore } from './redux/create-store'
import App from './App'

const { store } = configureStore()

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/*
        // @ts-ignore */}
        <App />
        {/*</PersistGate>*/}
      </BrowserRouter>
    </Provider>
  )
}

export default Root
