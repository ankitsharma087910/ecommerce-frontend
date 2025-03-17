import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useCart } from './../components/context/cart';
import { useAuth } from '../components/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import './CartPage.css';


const CartPage = () => {
  const [cart, setCart] = useCart();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      if(cart?.length){
        cart?.map((item) => {
          // console.log(item.price);
          total = total + item.price;
        });
        // console.log(total);
      }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.log(err);
    }
  };
  // delete card item
  const removeCardItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // handle payments
  const handlePayment = async () => {
    try {
      let orderData = localStorage.getItem("cart");
      orderData = JSON.parse(orderData);
      const res = await fetch(
        "https://ecommerce-backend-1-fze9.onrender.com/api/v1/products/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ options: orderData }),
        }
      );
      const response = await res.json();
      console.log(response);
      const options = {
        key: "rzp_test_IRjcb0G6tTY5VB",
        amount: response.totalPrice,
        currency: "INR",
        name: auth?.user?.name,
        description: "Test of payment",
        image:
          "https://www.aihr.com/wp-content/uploads/hierarchy-culture-cover.png",
        order_id: response.order.id,
        callback_url: `http://localhost:3000/cart`,
        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: auth?.user?.phone,
        },
        notes: {
          address: auth?.user?.address,
        },
        theme: {
          color: "#121212",
        },
        handler: async function (response) {
          console.log(response);
          const body ={...response};
         const validateRes = await fetch(
           "https://ecommerce-backend-1-fze9.onrender.com/api/v1/products/order/validate",
           {
             method: "POST",
             body: JSON.stringify(body),
             headers: {
               "Content-Type": "application/json",
             },
           }
         );
            const {success} = await validateRes.json();
            const email = auth?.user?.email;
            if(success){
              const addDatatoDb = await fetch(
                "https://ecommerce-backend-1-fze9.onrender.com/api/v1/products/orderDone",
                {
                  method: "POST",
                  body: JSON.stringify({
                    email,
                    cart,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
                localStorage.removeItem("cart");
                setCart([]);
              setTimeout(()=>{
             toast.success("Payment Successfully Successfully");
              },2000)
             navigate(`/dashboard/user/orders`);
            }else{
              alert("There is some error in the transaction please try again later");
              navigate('/cart');
            }

        },
      };
      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="cart-page" style={{ height: "100%" }}>
        <div className="products1">
          <h1 style={{ textAlign: "center", fontSize: "40px", color: "white" }}>
            {`Hello, ${auth?.token && auth?.user?.name}`}!
          </h1>
          <h2 style={{ textAlign: "center", color: "white" }}>
            {cart?.length >= 1
              ? `You have ${cart.length} items in your cart  ${
                  auth?.token ? "" : " please login to checkout"
                }`
              : "Your cart is empty!"}
          </h2>
        </div>
        <div className="products">
          {cart?.length && cart?.map((prod) => (
            <div className="prod">
              <div>
                <img
                  src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                  height={"100px"}
                  width={"100px"}
                />
              </div>
              <h4>{prod.name}</h4>
              <p>{prod.description.substring(0, 30)}...</p>
              <h4>Price : ${prod.price}</h4>
              <p>{prod.quantity}</p>
              <button
                className="cartBtn"
                onClick={() => {
                  removeCardItem(prod._id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 style={{ textAlign: "center", fontSize: "30px" }}>
            Cart Summary
          </h2>
          <div className="span-cart">
            <span>Total</span>
            <span>Checkout</span>
            <span>Payment</span>
          </div>

          <hr className="cart-line" />
          <div className="cart-sum">
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="address">
                  <h4>Current Address</h4>
                  <h3>{auth?.user?.address}</h3>
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    style={{ marginTop: "20px" }}
                    className="address"
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: "20px" }}>
                  {auth?.token ? (
                    <>
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="address"
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="CartBtn"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                        style={{
                          padding: "10px",
                          borderRadius: "5px",
                          border: "none",
                          backgroundColor: "red",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "white",
                          cursor: "pointer",
                          marginRight: "120px",
                        }}
                      >
                        Login to Checkout
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            <div style={{ marginTop: "20px" }}>
              {auth?.user ? (
                <button onClick={handlePayment} className="cartBtn">
                  Make Payment
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage