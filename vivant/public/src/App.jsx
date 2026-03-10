import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Calque_1 from '/plan_chemin.svg'
import ImageCrawl from './test'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Mort</h1>
      <div>
        <img src={Calque_1} className="w-100 logo" alt="logo" />
        <img src={Calque_1} className="logo" alt="logo" />
        <img src={Calque_1} className="logo" alt="logo" />
        <img src={Calque_1} className="logo" alt="logo" />
        <img src={Calque_1} className="logo" alt="logo" />
        <img src={Calque_1} className="logo" alt="logo" />
      </div>
      <ImageCrawl/>
    </>
  )
}

export default App
