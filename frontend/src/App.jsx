
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Hero from './components/Hero'
import CreateUpdate from './components/CreateUpdate'
import Form from './components/Form'
import Feed from './components/Feed'
import Loading from './components/Loading'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/:operation' element={<CreateUpdate/>} />
        <Route path='/:operation/:id' element={<CreateUpdate/>} />
        <Route path='/auth/:form' element={<Form/>} />
        <Route path='/feed' element={<Feed/>} />
        <Route path='/auth/logout' element={<Loading/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
