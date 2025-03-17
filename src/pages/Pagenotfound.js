import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom';

const Pagenotfound = () => {
  return (
    <Layout>
      <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        <h1>404</h1>
        <h2>Oops! Page Not Found </h2>
        <Link style={{textDecoration:"none",fontSize:"2rem",marginTop:"2rem"}} to={'/'}>Go Back</Link>
        </div>
    </Layout>
  );
}

export default Pagenotfound