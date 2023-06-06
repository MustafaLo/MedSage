import '../styles/Login.css'
import {useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isRegistering, setIsRegistering] = useState(false);

    //Pulling function from useAuth context
    const {signup, login} = useAuth()
    const[error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async() => {
        if(registerInformation.password != registerInformation.confirmPassword){
            setError('Passwords do not match.')
        }
        else{
            try{
                setError('')
                await signup(registerInformation.email, registerInformation.password)
                navigate('/builder')
            } catch (err){
                setError(err.message)
            }
        }
    }

    const handleLogin = async() => {
        try{
            setError('')
            await login(email, password)
            navigate('/builder')
        } catch(err){
            setError(err.message)
        }
    }


    return(
        <section className="login">
            {error && <h1>{error}</h1>}
            {isRegistering ? (
                <div className="container">
                    <div className="signupcard">
                        <h1>Sign Up</h1>
                        <div className="form">
                            <p>Email Address</p>
                            <div className="form-control">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                </svg>
                                <input type="email" placeholder='Type your email' value={registerInformation.email} onChange={(e) => setRegisterInformation({...registerInformation, email: e.target.value})}/>
                            </div>
                    </div>
                        <div className="form">
                                <p>Password</p>
                                <div className="form-control">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                    </svg>
                                    <input type="password" placeholder='Type your password' value={registerInformation.password} onChange={(e) => setRegisterInformation({...registerInformation, password: e.target.value})} />
                                </div>
                        </div>
                        <div className="form">
                                <p>Confirm Password</p>
                                <div className="form-control">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                    </svg>
                                    <input type="password" placeholder='Confirm your password' value={registerInformation.confirmPassword} onChange={(e) => setRegisterInformation({...registerInformation, confirmPassword: e.target.value})}/>
                                </div>
                        </div>

                        <div className="btns-control">
                            <button className='register-btn' onClick={handleSignUp}>CREATE MY ACCOUNT</button>
                            <button className='back-btn' onClick={() => setIsRegistering(false)}>Back</button>
                        </div>

                    </div>
                </div>
            
            ) : (
                <div className="container">
                    <div className="logincard">
                        <h1>Login</h1>
                        <div className="form">
                            <p>Email Address</p>
                            <div className="form-control">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                </svg>
                                <input type="email" placeholder='Type your email' onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form">
                            <p>Password</p>
                            <div className="form-control">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                                <input type="password" placeholder='Type your password' onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <button className='forgot-password'>Forgot your password?</button>
                        <div className="btns-control">
                            <button className='login-btn' onClick={handleLogin }><span>LOGIN</span></button>
                            <p>or</p>
                            <button className='create-acct-btn' onClick={() => setIsRegistering(true)}>Create an Account</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Login