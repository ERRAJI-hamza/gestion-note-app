import React from 'react'
import { Avatar } from '@mui/material';
import { grey } from '@mui/material/colors';
import logo_ensa from './../../images/logo_ensa.jpeg'
import {GrLogout} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import toast  from 'react-hot-toast';


export const Header = () => {
  const [auth, setAuth]=useAuth();
  const navigate = useNavigate() 
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate('/');
    toast.success("Logout Successfully");
  }
  return (
    <>
      <nav className='navbar'>
        <div className='container-fluid'>
          <div className='navbar-brand h1'>
             <img src={logo_ensa} className='logo_ensa'/>
          </div>
          <ul className='navbar-nav flex-row'>
              <li className='nav-item mx-3'>
                 <Avatar sx={{ bgcolor: grey[700]}}>OP</Avatar>
              </li>
              <li className='nav-item mx-3'>
                   <button className='btn btn-dark' onClick={handleLogout}>logout</button>
              </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
