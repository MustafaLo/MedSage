import '../styles/Navbar.css'
import logo from '../styles/logo.png'
import {  Link } from "react-router-dom";
import {useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const [error, setError] = useState('')
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try{
            setError('')
            await logout()
            navigate('/')
        } catch(err) {
            setError(err.message)
        }
    }

    
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
                <h1>MedSage</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/builder"><span>BUILDER</span></Link>
                    </li>
                    <li>
                        <Link to="/schedule"><span>SCHEDULE</span></Link>
                    </li>

                    <button className='logout' onClick={handleSignOut}>LOGOUT</button>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar