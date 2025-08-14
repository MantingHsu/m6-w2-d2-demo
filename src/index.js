// src/index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { fetchTodos } from './features/todos/todosSlice'

// Load initial todos from the fake API before first render
store.dispatch(fetchTodos())

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
