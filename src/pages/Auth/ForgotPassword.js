import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ForgotPassword.css';

const ForgotPassword = () => {
     const [email, setEmail] = useState("");
     const [newpassword, setnewPassword] = useState("");
     const [answer, setAnswer] = useState("");



     const navigate = useNavigate();

     // form function
     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const res = await axios.post( "/api/v1/auth/forgot-password",
           {
             email,
             newpassword,
             answer
           }
         );
         if (res.data.success) {
            setTimeout(()=>{
           toast.success(res.data && res.data.message)
            },1000);
             navigate("/login");
         } else {
           toast.error(res.data.message);
           navigate('/');
         }
       } catch (err) {
         console.log(err);
         toast.error("Something went wrong!");
       }
     };
  return (
    <div>
      <Layout title={"Forgot Password - Ecommerce APP "}>
      <div className="centered-container">
        <div className="curved-box">
        <div className="reghead">

         
        <h1 className='reg'>Forgot Password</h1>
        </div>
        <form onSubmit={handleSubmit} className='Regform' autoComplete='off'>
          
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter your Email' 
            className='regName'
          />

         
          <input
            type="text"
            id="answer"
            name="answer"
            value={answer}
            placeholder='Enter your favourite Sport Name'
            onChange={(e) => setAnswer(e.target.value)}
            required
            className='regName'
          />


         
          <input
            type="password"
            id="password"
            placeholder='Enter new password'
            name="password"
            value={newpassword}
            onChange={(e) => setnewPassword(e.target.value)}
            required
            className='regPass'
          />
       

          <button type="submit" className='SubmitBtn'>Reset</button>
        </form>
        </div>
        </div>
      </Layout>
    </div>
  );
}

export default ForgotPassword