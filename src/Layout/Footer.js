import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <h1 className="footer-head">All Rights Reserved &copy; AS</h1>
      <p className="links">
        <Link to={"#"}>About</Link>
        <Link to={"#"}>Contact</Link>
        <Link to={"#"}>Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer