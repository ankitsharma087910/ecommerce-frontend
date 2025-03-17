import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminMenu.css'

const AdminMenu = () => {
  return (
    <div className="admin-menu">
      <h1>Admin Panel</h1>
      <div className='Admenu'>
        <NavLink className={"Admenu-link"} to={"/dashboard/admin/create-category"}> Create Category</NavLink>
        <NavLink className={"Admenu-link"} to={"/dashboard/admin/create-product"}>Create Product</NavLink>
        <NavLink className={"Admenu-link"} to={"/dashboard/admin/products"}>Products</NavLink>
        <NavLink className={"Admenu-link"} to={"/dashboard/admin/orders"}>Orders</NavLink>
        <NavLink className={"Admenu-link"} to={"/dashboard/admin/users"}>Users</NavLink>
      </div>
    </div>
  );
}

export default AdminMenu