import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';

const provider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [loading, setloading] = useState(true)
    const [user, setUser] = useState(null)

    // create User
    const createUser = (email, password, name, photo) => {
        setloading(false)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                })
            });
    }

    // sign in User
    const signIn = (email, password) => {
        setloading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google sign in
    const googleSignIn = () => {
        setloading(true)
        return signInWithPopup(auth, provider)
    }

    // SignOut 
    const logOut = () => {
        return signOut(auth)
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setloading(false)
            console.log(currentUser);
        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        loading,
        user,
        createUser,
        signIn,
        googleSignIn,
        logOut
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;