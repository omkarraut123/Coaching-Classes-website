
import './App.css'
import Home from './pages/Home'
import Navigationbar from './components/layout/Navigationbar'
import ContactUs from './pages/ContactUs'
import {Route, Routes } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
//somechanges in feature branch
function App() {

  return (
    <>
    <main className="App">
      <Navigationbar />
        <Routes>
        <Route path='/Coaching-Classes-website' element={<Home />}/>
         <Route path='/Coaching-Classes-website/contactus' element={<ContactUs />}/>
          <Route path='/Coaching-Classes-website/aboutus' element={<AboutUs />}/>
      </Routes>
    </main>
    </>
  )
}

export default App
