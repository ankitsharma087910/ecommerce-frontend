import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from './../../Layout/AdminMenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../components/context/auth';
import moment from 'moment';
import './AdminOrders.css';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    'Not Process',
    'Processing',
    'Shipped',
    'delivered',
    'cancel',
  ]);
  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-orders');
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"All Orders Data"}>
      <div className="order-container">
        <div className="O-left">
          <AdminMenu />
        </div>

        <div className="O-right">
          <table>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Buyer</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Quantity</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((o, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{o?.status}</td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.payment}</td>
                  <td>{o?.products.length}</td>
                  <td className="ordersDiv">
                    {o?.products?.map((prod, index) => (
                      <div key={index}>
                        <img
                          src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                          height={"100px"}
                          width={"100px"}
                          alt={prod.name}
                        />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
