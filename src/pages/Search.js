import React from "react";
import { useSearch } from "../components/context/search";
import Layout from "../Layout/Layout";
import { useCart } from "../components/context/cart";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { values, setValues } = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!values?.result) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [values?.result]);

  return (
    <Layout title={"Search Results"}>
      <div
        style={{
          marginBottom: "90px",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1 style={{ fontSize: "30px", color: "#333" }}>Search Results</h1>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
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
          ) : values?.result.length < 1 ? (
            <p style={{ color: "red", fontSize: "25px" }}>No Products Found</p>
          ) : (
            <p style={{ fontWeight: "500", fontSize: "25px", color: "#333" }}>
              Found {values?.result.length} Products
            </p>
          )}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {values?.result?.map((prod) => (
            <div
              key={prod._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.2s",
                cursor: "pointer",
                minHeight: "300px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={`https://ecommerce-backend-1-fze9.onrender.com/upload/${prod.photo}`}
                  alt={prod.name}
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "5px 0",
                  }}
                >
                  {prod.name}
                </h5>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "5px 0",
                  }}
                >
                  {prod.description.substring(0, 30)}...
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#4fa94d",
                    margin: "5px 0",
                  }}
                >
                  ${prod.price}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                    "@media (min-width: 768px)": {
                      flexDirection: "row",
                    },
                  }}
                >
                  <button
                    style={{
                      width: "120px",
                      height: "40px",
                      padding: "8px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007bff")
                    }
                    onClick={() => navigate(`/product/${prod._id}`)}
                  >
                    More Details
                  </button>
                  <button
                    style={{
                      width: "120px",
                      height: "40px",
                      padding: "8px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#218838")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#28a745")
                    }
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
