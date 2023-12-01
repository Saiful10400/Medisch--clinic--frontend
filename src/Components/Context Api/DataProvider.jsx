import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Authentication/firebase.config';
import useAxiosPublic from '../custom Hooks/useAxiosPublic';



export const dataProvider=createContext(null) 


const DataProvider = ({children}) => {
const[user,setuser]=useState(null)
const[loading,setloading]=useState(true)
const axiosPublic=useAxiosPublic()
useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(res)=>{
        setuser(res)
        axiosPublic.post("/jwt_token",{email:res.email},{withCredentials:true})
        setloading(false)
    })
    return ()=>{
        return unsubscribe
    }
},[])

// img bb image url
const uploadUrl=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_CLIENT_API_KEY}`

// all login handles.

// email and password.

const signin=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

// google signin.
const googleLogin=()=>{
    const googleProvider=new GoogleAuthProvider()
    return signInWithPopup(auth,googleProvider)
}
// facebook login
const facebookLogin=()=>{
    const facebookProvider=new FacebookAuthProvider()
    return signInWithPopup(auth,facebookProvider)
}
// email and password login.
const emailLogin=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
// logout handle

const logout=()=>{
    return signOut(auth)
}


    const contextApiData={user,loading,logout,emailLogin,signin,googleLogin,facebookLogin,uploadUrl}
    return (
       <dataProvider.Provider value={contextApiData}>
        {
            children
        }
       </dataProvider.Provider>
    );
};

export default DataProvider;