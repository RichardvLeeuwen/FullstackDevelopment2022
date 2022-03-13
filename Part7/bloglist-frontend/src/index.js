import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './reducers/notiReducer'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    notifications: notiReducer,
  }
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))