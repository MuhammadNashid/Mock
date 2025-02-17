import { useState } from 'react'
import './App.css'
import { BrowserRouter,Router,Route } from 'react-router-dom'
import home 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Router>
      <Route path='/' element={<Home/>}></Route>
     </Router>
     </BrowserRouter>
    </>
  )
}

export default App
