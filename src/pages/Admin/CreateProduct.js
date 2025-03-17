import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import AdminMenu from '../../Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [file, setFile] = useState("");

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // create product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("category", category);
      formData.append("file", file);

      const { data } = await axios.post('/api/v1/products/create-product', formData);
      
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  return (
    <Layout title={"Create Product - Ecommerce App"}>
      <div className="createprod-container">
        <div className="createprod-left">
          <AdminMenu />
        </div>
        <div className="createprod-right">
          <h2>Create Product</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="upload-photo">
                <label htmlFor="file" className="">
                  {file ? file.name : "Click here to Upload Photo"}
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                id="textarea"
                value={description}
                placeholder="Enter product description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Enter product price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Enter product quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Select
                placeholder="Select shipping"
                size="large"
                showSearch
                onChange={(val) => setShipping(val)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <button type="submit">Create Product</button>
            </form>
        </div>
      </div>
    </Layout>
  );
}



export default CreateProduct;


