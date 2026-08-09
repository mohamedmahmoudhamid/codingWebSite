import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './compounats/Footer'
import Navbar from './compounats/Navbar'
import Users from './compounats/Users'
import CounactUs from './compounats/CounactUs'
import AboutUs from './compounats/AboutUs'
import Services from './compounats/Services'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar />    

    <Routes>
      <Route path='/' index={true} element={<Users/>}/>
      <Route path='/contact' element={<CounactUs/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
    </Routes>
    
    <Footer />
    </BrowserRouter>
    

    </>
  )
}

export default App
