import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './compounats/Footer'
import Navbar from './compounats/Navbar'
import Users from './compounats/Users'
import CounactUs from './compounats/CounactUs'
import AboutUs from './compounats/AboutUs'
import Services from './compounats/Services'
import NotFound from './compounats/NotFound'
import Prodact from './compounats/prodact'
import ProdactDetails from './compounats/ProdactDetails'


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
      <Route path='/products' element={<Prodact/>}/>
      <Route path='/details/:id' element={<ProdactDetails/>}/>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
    
    <Footer />
    </BrowserRouter>
    

    </>
  )
}

export default App
