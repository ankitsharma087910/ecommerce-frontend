import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import {toast} from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Register.css'

const Register = () => {


    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    // form function
    const handleSubmit= async(e)=>{
        e.preventDefault();
       try{
        console.log(name, email, password, phone, address, answer);
        setLoading(true);
        const res = await axios.post("/api/v1/auth/register",{
            name,email,password,phone,address,answer
        });
        if(res.data.success){
            toast.success(res.data.message);
            setLoading(false);
            setTimeout(()=>{
            navigate("/login");
            },2000);
        }else{
            toast.error(res.data.message);
            setLoading(false);
        }
       }catch(err){
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong!");
       }
    }

    
  return (
    <Layout title={"Register - Ecommerce-app"}>
      <div className="centered-container">
        <div className="curved-box" style={{ marginBottom: "50px" }}>
          <div className="reghead">
            <h1 className="reg">Register Page</h1>
          </div>

          <form onSubmit={handleSubmit} className="Regform" autoComplete="off">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="RegName"
              disabled={loading}
            />

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              disabled={loading}
              className="RegMail"
            />

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="RegPass"
              placeholder="Password"
              disabled={loading}
            />

            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="RegTel"
              placeholder="Mobile Number"
              disabled={loading}
            />

            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="RegAdd"
              placeholder="Address"
              disabled={loading}
            />

            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your favourite sports?"
              required
              className="RegAns"
              disabled={loading}
            />
            <button type="submit" className="SubmitBtn" disabled={loading}>
             {loading ? "Registering..." :  "Register"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
