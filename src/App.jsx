import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Details from './Components/Details/Details'

// creating app  for the some of teh
const App = () => {
  
  return (
    {/*Setting up routes */}
    
   <>
   <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/details' element={<Details/>}/>
   </Routes>
   </>
  )
}

export default  App
