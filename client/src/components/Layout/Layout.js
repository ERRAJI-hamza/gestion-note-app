import React , {useState} from 'react'
import { Header } from './Header';
import {Helmet} from 'react-helmet';
import {useAuth} from './../../context/Auth.js'
import { Toaster } from "react-hot-toast";
import { Sidebar } from './Sidebar';

export const Layout = ({children ,title}) => {
  const [auth , setAuth]= useAuth()
  return (
    <>   
         <div className='Header'>
                 <Header/>
                 <Toaster/>
         </div>
         <div className='row g-0'>
              <div className='col-md-3'><Sidebar/></div>
              <div className='col-md-9'>{children}</div>
         </div>
    </>
  )
}

