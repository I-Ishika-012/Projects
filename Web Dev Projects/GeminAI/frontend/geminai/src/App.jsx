import { useState } from 'react'

import axios from 'axios'
import { useMutation } from 'react-query'
import logo from './public/geminai-logo.png'
// import './App.css'

//!Function that must return a promise (useMutation)
const makeRequestAPI = async () => {
  const res = await axios.post("https://localhost:3000/generate" )
  return res.data;
};

function App() {
function App() {
  //!mutation
const mutation = useMutation({
  mutationFn: makeRequestAPI,
  mutationKey: ['generate-request'],
});

//!submit handler
const submitHandler = (e) => {
  e.preventDefault();
  mutation.mutate(prompt);
};
  return (
   <div className="App">
    <header className="App-header">
      <img src={logo}/>
      <h1>AI Content Generator</h1>
      </header>
      <p>Enter a prompt and let GeminAI craft a unique content for you!</p>
      <form className='App-form' onSubmit={submitHandler}>
        <label htmlFor="">Enter a prompt</label>
        <input type="text" value={prompt} />
        <button className='App-button' type='submit'>Generate</button>
      </form>
   </div>>
  )
}

export default App
