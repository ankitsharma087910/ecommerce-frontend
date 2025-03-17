import React, { Children, useEffect, useState } from "react";
import AdminMenu from "../../Layout/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import Layout from "../../Layout/Layout";
import "./UpdateProduct.css";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [file, setFile] = useState("");

  const [d, setD] = useState("");

  const params = useParams();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      // console.log(data.category);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  //  get single product
  const getSingleProduct = async () => {
    try {
      const id = params?.id;
      const { data } = await axios.get(`/api/v1/products/get-product/${id}`);
      setName(data?.product.name);
      setDescription(data?.product.description);
      setPrice(data?.product.price);
      setCategory(data?.product.category);
      setQuantity(data?.product.quantity);
      setShipping(data?.product.shipping);
      setFile(data?.product.photo);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting the product");
      if (error) navigate("/");
    }
  };
  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);

  // update  product
  const handleUpdate = async (e) => {
    e.preventDefault();
    //  console.log(file.name)

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("quantity", quantity);
      formdata.append("shipping", shipping);
      formdata.append("category", category);
      formdata.append("file", file);

      const id = params.id;
      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        formdata
      );

      console.log(data);
      if (data?.success) {
        setTimeout(() => {
          toast.success("Product updated Successfully");
        }, 1000);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating product");
    }
  };

  //  Delete product =======================================
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you  want to delete this product ?"
      );
      if (!answer) return;

      setTimeout(() => {
        toast.success("Product deleted Successfully");
      }, 1000);
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${params.id}`
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Product deleted Successfully");
        }, 1000);
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went  wrong");
    }
  };
  return (
      <Layout title={"Update Product - Ecommerce App"}>
        <div className="updprod-container">
            <div className="updprod-left">
              <AdminMenu />
            </div>
            <div className="updprod-right">
              <div className="upd-container">
                <form>
                 <p >Select category:</p> 
                  <Select
                    placeholder="select a category"
                    size="large"
                    showSearch
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category.name}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="prod-img">
                    <label>
                      {file ? "Click here to Upload Photo" : file.name}
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        hidden
                      />
                      {file.name}
                    </label>
                  </div>
                  <div>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={name}
                      placeholder="write a name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <textarea
                      type="text"
                      rows={"20"}
                      cols={"20"}
                      value={description}
                      placeholder="write a description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={price}
                      placeholder="write price of the product"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write quantity of the product"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="setflec">
                  <p>Select shipping:</p> 
                    <Select
                      placeholder="Select shipping"
                      size="large"
                      showSearch
                      onChange={(val) => {
                        setShipping(val);
                      }}
                      value={shipping ? "yes" : "no"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                    <div  className="upd-btns">
                      <div>
                        <button onClick={handleUpdate}>Update Product</button>
                      </div>
                      <div>
                        <button onClick={handleDelete}>
                          Delete Product
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </Layout>
  );
};

export default UpdateProduct;
