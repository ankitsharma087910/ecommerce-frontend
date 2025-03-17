import React from 'react'
import { NavLink } from 'react-router-dom';
import './UserMenu.css'

const UserMenu = () => {
  return (
    <div className="user-menu">
      <div>
        <h1 className="D-head">Dashboard </h1>
        <NavLink
          to={"/dashboard/user/profile"}
          activeClassName="active-link"
          className="menu-link"
        >
          Profile
        </NavLink>
        <NavLink
          to={"/dashboard/user/orders"}
          activeClassName="active-link"
          className="menu-link"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
}

export default UserMenu