import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './layout'
import 'highlight.js/styles/github-dark.css'

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Layout />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
)
