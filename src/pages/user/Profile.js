import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout';
import UserMenu from '../../Layout/UserMenu';
import { useAuth } from '../../components/context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Profile.css'

const Profile = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password , setPassword] = useState("");

   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");


   const {auth,setAuth} = useAuth();
   const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // console.log(name, email, password, phone, address, answer)
        const {data} = await axios.put("/api/v1/auth/profile", {
          name,
          email,
          password,
          phone,
          address,
        });
        if (data?.error) {
          toast.success(data.message)
        } else {
          setAuth({...auth,user:data?.updatedUser});
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data?.updatedUser
          localStorage.setItem("auth",JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!");
      }
    };


    // get user data 
    useEffect(()=>{
      const {email,name,phone,address} = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone)
      setAddress(address)
    },[auth?.user])
  return (
    <Layout title={"Your Profile"}>
      <div className="profile-container" style={{height:"100%"}}>
          <div className="D-left">
            <UserMenu />
          </div>
          <div className="D-right">
            <h1>User Profile</h1>
            <form
              onSubmit={handleSubmit}
              className="profileform"
              autoComplete="off"
            >
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
                className="disabled"
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter New Password'
              />

              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <button type="submit">Update</button>
            </form>
          </div>
      </div>
    </Layout>
  );
}

export default Profile