// Search.js

import React from 'react';
import { useSearch } from '../components/context/search';
import Layout from '../Layout/Layout';
import { useCart } from '../components/context/cart';
import { toast } from 'react-toastify';
import './Search.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { values, setValues } = useSearch();
  const [cart, setCart] = useCart();
const navigate = useNavigate();
  return (
    <Layout title={"Search Results"}>
      <div className="admin-container" style={{ marginBottom: "90px" }}>
        <div className="search-results">
          <h1 style={{ fontSize: "30px" }}>Search Results</h1>
          {values?.result.length < 1 ? (
            <p style={{ color: "red", fontSize: "25px" }}>No Products Found</p>
          ) : (
            <p style={{ fontWeight: "500", fontSize: "25px" }}>
              Found {values?.result.length} Products
            </p>
          )}
        </div>
        <div className="products-container">
          {values?.result?.map((prod, index) => (
            <div className="prod-cards" key={index}>
              <div className="card">
                <div className="card-img">
                  <img
                    src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                    alt={prod.name}
                    height={"100px"}
                    width={"100px"}
                  />
                </div>
                <div className="prod-info">
                  <h5 className="prod-title">{prod.name}</h5>
                  <p className="prod-des">
                    {prod.description.substring(0, 30)}
                  </p>
                  <p className="prod-price">${prod.price}</p>

                  <button
                    className="details-button"
                    onClick={() => navigate(`/product/${prod._id}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="SubmitBtn"
                    style={{
                      width: "270px",
                      height: "40px",
                      padding: "2px",
                      margin: "5px",
                    }}
                    onClick={() => {
                      setCart([...cart, prod]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, prod])
                      );
                      toast.success("Item added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
