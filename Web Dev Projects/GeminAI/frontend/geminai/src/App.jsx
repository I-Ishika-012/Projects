import { useState } from 'react'

import axios from 'axios'
import { useMutation } from 'react-query'
import logo from './public/geminai-logo.png'
// import './App.css'

//!Function that must return a promise (useMutation)
const makeRequestAPI = async () => {
  const res = await axios.post("https://localhost:5173s/generate" )
  return res.data;
};

function App() {

  return (
   <div className="App">
    <header className="App-header">
      <img src={logo}/>
      <h1>AI Content Generator</h1>
      </header>
      <p></p>
   </div>>
  )
}

export default App
