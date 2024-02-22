
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Hero from './components/Hero'
import CreateUpdate from './components/CreateUpdate'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/:operation' element={<CreateUpdate/>} />
        <Route path='/:operation/:id' element={<CreateUpdate/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
