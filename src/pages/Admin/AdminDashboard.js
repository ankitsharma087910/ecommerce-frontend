import React from 'react'
import Layout from './../../Layout/Layout';
import AdminMenu from '../../Layout/AdminMenu';
import { useAuth } from '../../components/context/auth';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const {auth} = useAuth();
  return (
      <Layout title={"Admin Dashboard - Ecommerce App"}>
        <div className='admin-con'>
            <div className="A-left">
              <AdminMenu />
            </div>
            <div className="A-right">
              <div>
              <h1>Admin Name : {auth?.user?.name}</h1>
              <h1>Admin Email : {auth?.user?.email}</h1>
              <h1>Admin Contact : {auth?.user?.phone}</h1>
              </div>
            </div>
          </div>
      </Layout>
  );
}

export default AdminDashboard