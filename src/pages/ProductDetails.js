// ProductDetails.js

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/context/cart";
import { toast } from "react-toastify";
import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.id}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);

  return (
    <Layout>
      <div className="proddet-container">
        <div className="product-details-more">
          <div className="product-image">
            <img
              src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${product.photo}`}
              alt={product.name}
              height={"100px"}
              width={"100px"}
            />
          </div>
          <div className="products-info">
            <h1>{product.name}</h1>
            <p className="description">{product.description}</p>
            <div className="justflex">
              <p className="price">Price: ${product.price}</p>
              <p className="category">Category: {product.category?.name}</p>
              <p className="shipping">
                Shipping: {product.shipping ? "Available" : "Not Available"}
              </p>
            </div>
            <div className="Submit-Button">
              <button
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Item added to Cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="similar-products">
          <h2>Similar Products</h2>
          {relatedProduct?.length < 1 && <p>No similar products found</p>}
          <div className="related-products-container">
            {relatedProduct.map((prod) => (
              <div className="related-product" key={prod._id}>
                <img
                  src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                  alt={prod.name}
                  height={"100px"}
                  width={"100px"}
                />
                <div className="related-product-info">
                  <h3>{prod?.name}</h3>
                  <p className="description">
                    {prod?.description.substring(0, 30)}...
                  </p>
                  <p className="price">${prod.price}</p>
                  <div className="prod-details-btn">
                    <button
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
                    <button
                      style={{ marginLeft: "4px" }}
                      onClick={() => navigate(`/product/${prod._id}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
