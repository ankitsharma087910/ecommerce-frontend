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
     const [loading, setLoading] = useState(false);

     const {auth,setAuth}= useAuth();


     const navigate = useNavigate();
     const location = useLocation();

     // form function
     const handleSubmit = async (e) => {
       e.preventDefault();
       let res;
       if (!email || !password) {
         toast.error("Please fill all fields");
         return;
       }
       try {
        setLoading(true);
          res = await axios.post(
           `/api/v1/auth/login`,
           {
             email,
             password,
           }
         );
        
         console.log(res,'res');
         if (res.data.success) {
           toast.success(res.data.message);
        setLoading(false);

           setTimeout(()=>{
            setAuth({
                user:res.data.user,
                token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
           navigate(location.state || "/");
           },1500);
         } else {
          console.log(res,'res')
        setLoading(false);

           toast.error(res?.message);
         }
       } catch (err) {
         console.log(err,'akres');
        setLoading(false);

         toast.error( err?.response?.data?.message ?? "Something went wrong!");
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
          disabled={loading}
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
          disabled={loading}
        />
        <div className='loginbtns'>
        <button type="button" disabled={loading} onClick={()=> navigate('/forgot-password')} className='ForgotPasswordBtn '>Forgot Password</button>

        <button type="submit" className='SubmitBtn' disabled={loading}>
         {loading ? "Submitting..." : "Login"} 
          </button>
        </div>
      </form>
      </div>
      </div>

    
    </Layout>
  );
}

export default Login