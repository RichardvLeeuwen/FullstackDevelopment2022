import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './reducers/notiReducer'
import blogReducer from './reducers/blogReducer'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    notifications: notiReducer,
    blogs: blogReducer
  }
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))