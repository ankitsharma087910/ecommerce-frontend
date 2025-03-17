import React, { useState } from 'react'
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import './Header.css';
import { useAuth } from '../components/context/auth';
import {toast} from "react-toastify"

import { IoIosArrowDropdown } from "react-icons/io";
import SearchInput from '../components/Form/SearchInput';
import { GiHamburgerMenu } from "react-icons/gi";

import useCategory from '../hooks/useCategory';
import { useCart } from '../components/context/cart';
import {Badge} from "antd"

const Header = () => {
  const {auth,setAuth} = useAuth();
  const categories = useCategory();
  const [cart,setCart] = useCart();
  const navigate = useNavigate();
  const[openProfile,setOpenProfile] = useState(false);

  const handleLogout = ()=>{

    toast.success("Logout Successfully");
    setTimeout(()=>{
    navigate("/login");
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
        // setCart({
        //   ...cart,
        //   cart: null,
        // });
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
    },1000)
  }

  return (
    <div className="nav">
      <div className="left">
        <li>
          <FaCartShopping style={{ fontSize: "2rem",color:"white" }} />
          <Link to={"/"} className="cart-icon">
            THRIVE CART
          </Link>
        </li>
      </div>
      <div className="searchbar">
        <li>
          <SearchInput />
        </li>
      </div>
      <div className="right">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!auth.user ? (
          <>
            <li>
              <NavLink to={"/register"}>Register</NavLink>
            </li>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                onClick={(prev) => {
                  setOpenProfile((prev) => !prev);
                }}
              >
                {auth?.user?.name}
                <IoIosArrowDropdown
                  style={{ marginLeft: "3px", fontSize: "1rem" }}
                />
              </NavLink>
            </li>

            {openProfile && (
              <>
                <div className="dropdown">
                  <ul>
                    <li style={{ color: "black" }}>
                      <NavLink
                        style={{color:"white"}}
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout}>Logout</NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}

        <li>
          <NavLink to={"/cart"}>Cart </NavLink>
          <Badge
            count={cart?.length}
            showZero
            style={{
              marginTop: "-2.3em",
              marginRight: "-13px",
              position: "absolute",
            }}
          ></Badge>
        </li>
      </div>
    </div>
  );
}

export default Header