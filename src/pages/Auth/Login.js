import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { toast } from "react-toastify";
import axios from 'axios';
import { useAuth } from '../../components/context/auth';
import './Login.css'

const Login = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const {auth,setAuth}= useAuth();


     const navigate = useNavigate();
     const location = useLocation();

     // form function
     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const res = await axios.post(
           `/api/v1/auth/login`,
           {
             email,
             password,
           }
         );
         if (res.data.success) {
           toast.success(res.data.message);
           setTimeout(()=>{
            setAuth({
                user:res.data.user,
                token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
           navigate(location.state || "/");
           },1500);
         } else {
           toast.error(res.data.message);
         }
       } catch (err) {
         console.log(err);
         toast.error("Something went wrong!");
       }
     };
  return (
    <Layout title={"Login - Ecommerce-app"}>
     <div className="centered-container">
      <div className="curved-box">
        <div className="reghead">

      <h1 className='reg'>Login Page</h1>
        </div>

      <form onSubmit={handleSubmit} className='Regform' autoComplete='off'>
       
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='E-mail'
          className='loginp'
        />
      
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
          className='logpass'
        />
        <div className='loginbtns'>
        <button type="button" onClick={()=> navigate('/forgot-password')} className='ForgotPasswordBtn '>Forgot Password</button>

        <button type="submit" className='SubmitBtn'>Login</button>
        </div>
      </form>
      </div>
      </div>

    
    </Layout>
  );
}

export default Login