import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cart";
import { ThreeDots } from "react-loader-spinner"; // Import the loader component
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error in fetching products");
    }
  };
  
 

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
      console.log(all + "checking with id");
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  // Get filtered products
  const filterProduct = React.useCallback(async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    getAllCategories();
    getTotal();
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, filterProduct]);


  return (
    <Layout title={"All products - Best Offers"}>
      <div className="home-container">
        <div className="homeleft">
          <h4>Filter by Category</h4>
          <div className="filterByCategory">
            {categories?.map((c) => (
              <Checkbox
                className="checkBox"
                key={c._id}
                onChange={(e) => {
                  handleFilter(e.target.checked, c._id);
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4>Filter by Price</h4>
          <div className="filterByPrice">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio className="radio" value={p.array}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <br />
          <div>
            <button
              onClick={() => window.location.reload()}
              className="filterBtn"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="homeright">
          <h1 style={{ textAlign: "center" }}>All Products</h1>
          {/* Loader for initial product fetch */}
          {loading && products.length === 0 && (
            <div
              className="loader"
              style={{ textAlign: "center", padding: "20px" ,display:'flex', justifyContent: 'center', alignItems: 'center',width:"100%",height:"80vh"}}
            >
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          )}
          <div className="pro">
            {products &&
              products?.map((prod) => (
                <div className="pro-cd" key={prod._id}>
                  <div className="pro-img">
                    <img
                      src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                      width="100px"
                      height="100px"
                      alt={prod.name}
                    />
                  </div>
                  <div className="pro-det">
                    <h5 className="pro-n">{prod.name}</h5>
                    <p className="pro-desc">
                      {prod.description.substring(0, 30)}...
                    </p>
                    <p className="pro-price">${prod.price}</p>
                    <div className="flexbtns">
                      <button
                        onClick={() => navigate(`/product/${prod._id}`)}
                        className="more-details"
                      >
                        More Details
                      </button>
                      <button
                        onClick={() => {
                          setCart([...cart, prod]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, prod])
                          );
                          toast.success("Item added to Cart");
                        }}
                        className="add-to-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="load">
            {Array.isArray(products) && products.length < total && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <button
                  className="load-more"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <ThreeDots
                      height="30"
                      width="30"
                      radius="9"
                      color="#4fa94d"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  ) : (
                    "Load more"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
