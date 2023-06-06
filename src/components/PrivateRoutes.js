import { useAuth } from '../contexts/AuthContext';
import {Navigate, Outlet} from 'react-router-dom'
const PrivateRoutes = () => {
    const {currentUser} = useAuth()
    return(
        currentUser ? (<Outlet/>) : (<Navigate to='/'/>)
    )
}

export default PrivateRoutes