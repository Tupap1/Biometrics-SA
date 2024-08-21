import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>login</h1>

    <input type="text" />
    <br />
    <input type="text" />

    <br /><br /><br />
    <button>Ingresar</button>
    </>
  )
}

export default App
