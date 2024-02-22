
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Hero from './components/Hero'
import Create from './components/Create'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
