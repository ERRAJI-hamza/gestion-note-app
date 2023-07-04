import React , {useEffect, useState} from 'react'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import { Spinner } from '../Spinner';

export const PrivateProf = () => {
    const [ok,setOk] = useState(false)
    const [auth,setAuth] = useAuth()
 
  useEffect ( () => {
    const authCheck = async () => {
        const res = await axios.get("/api/user/prof-auth");
        if(res.data.ok) {
            setOk(true);
        }else{
            setOk(false);
        }
    };
    if(auth?.token) authCheck()
  },[auth?.token])
  return ok ? <Outlet/> : <Spinner/>
}
