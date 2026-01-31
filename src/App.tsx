
import './App.css'
import Home from './pages/Home'
import Navigationbar from './components/layout/Navigationbar'
import ContactUs from './pages/ContactUs'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//somechanges in feature branch
function App() {

  return (
    <>
    <div className="App">
      <Navigationbar />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
         <Route path='/contactus' element={<ContactUs />}/>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
