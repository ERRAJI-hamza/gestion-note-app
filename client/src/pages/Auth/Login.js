import React , {useState} from 'react'
import profile from './../../images/profile.png'
import axios from "axios";
import toast , { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
     const res = await axios.post("/api/user/login",{email,password});
     if (res && res.data.success) {
      toast.success(res.data && res.data.message);
      setAuth({
        ...auth,
        user: res.data.user,
        token: res.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate(`/Home/${
        res.data.user.role === 1 ? "admin" : "prof"
      }`);
      console.log(res.data.user.role)
      console.log(res.data)
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
  };
  return (
    <>
    <div className='login'>
      <div className='sub-login'> 
        <div className='imgs'> 
           <div className='container-img'> 
              <img src={profile} className='profile'/> 
           </div>  
        </div> 
        <Toaster/>
        <div className='formlogin'>
           <form onSubmit={handleSubmit}> 
            <h4 className="title" id='titlelogin'>LOGIN FORM</h4>
            <div className="mb-3">
             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
             <input type="email" 
             className="form-control" 
             id="exampleInputEmail1"
             aria-describedby="emailHelp" 
             placeholder="Enter Your Email "
             value={email}
             onChange={(e) =>setEmail(e.target.value)}
             autoFocus
             required
            />
            </div>
            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" 
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password "
              required
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" id='login'>Submit</button>
          </form>
        </div>
      </div>  
    </div>   
    </>
  )
}
