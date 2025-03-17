import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../components/context/auth';
import moment from "moment";
import './Orders.css';

const Orders = () => {
  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState([]);
  
  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders');
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token])

  return (
    <Layout title={"Your Orders "}>
      <div className="order-container">
        <div className="O-lefts">
          <UserMenu />
        </div>
        <div className="O-rights">
          <h1
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            ALL orders
          </h1>
          <table style={{ border: "none" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Buyer</th>
                <th scope="col">Date</th>
                <th scope="col">Payment</th>
                <th scope="col">Quantity</th>
                <th scope="col">Your Order</th>
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
                      <div key={index} style={{ objectFit: "contain" }}>
                        <img
                          src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                          height={"50px"}
                          width={"50px"}
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
}

export default Orders;
