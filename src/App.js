import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login"
import Builder from './components/Builder';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes from './components/PrivateRoutes';


function App() {
  return(
    <div className='App'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route  path='/builder' element={<> <Navbar/> <Builder/> </>}></Route>
              </Route>
              <Route path='/' element={<Login/> }></Route>
            </Routes>
          </AuthProvider>
        </Router>
    </div>
  )
}

export default App;
