import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase/firebase.js'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const[currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        //Returns a method to unsubscribe from component
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user) 
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser, 
        signup,
        login,
        logout
    }
     
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}