import {useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import '../styles/Builder.css'

const Builder = () => {
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
        <section className="builder">
            <button onClick={handleSignOut}>SignOut</button>
        </section>
    )
}

export default Builder