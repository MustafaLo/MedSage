import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login"
import Builder from './components/Builder';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import Home from './components/Home'
import { AuthProvider } from './contexts/AuthContext';
import { DbProvider } from './contexts/DbContext';
import PrivateRoutes from './components/PrivateRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  return(
    <div className='App'>
        <Router>
          <AuthProvider>
            <DbProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Routes>
                <Route element={<PrivateRoutes/>}>
                  <Route  path='/builder' element={<> <Navbar/> <Builder/> </>}></Route>
                  <Route  path='/schedule' element={<> <Navbar/> <Schedule/> </>}></Route>
                </Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/' element={<Home/> }></Route>
              </Routes>
            </LocalizationProvider>
            </DbProvider>
          </AuthProvider>
        </Router>
    </div>
  )
}

export default App;
