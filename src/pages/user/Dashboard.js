import React from 'react'
import Layout from  "../../Layout/Layout"
import { useAuth } from '../../components/context/auth';
import UserMenu from '../../Layout/UserMenu';
import './Dashboard.css'
const Dashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout title={"User Dashboard - Ecommerce App"}>
      <div className="dashboard-container">
          <div className="Dleft">
            <UserMenu />
          </div>
          <div className="Dright">
            <h1 className="Dhead">Name : {auth?.user?.name}</h1>
            <h1 className="Dhead"> Email : {auth?.user?.email}</h1>
            <h1 className="Dhead"> Contact : {auth?.user?.phone}</h1>
          </div>
        </div>
      {/* </div> */}
    </Layout>
  );
}

export default Dashboard