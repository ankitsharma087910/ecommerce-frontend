import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import AdminMenu from "../../Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import "./CreateCategory.css";

import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdatedName] = useState("");

  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data.success) {
        // console.log(data.category.name);
        setTimeout(() => {
          toast.success(`${data.category.name} is created successfully`);
        }, 1000);
        getAllCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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

  useEffect(() => {
    getAllCategories();
  }, []);

  // handleUpdate function = ========   update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        {
          name: updateName,
        }
      );
      if (data.success) {
        toast.success(`${updateName} is updated successfully`);

        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      //  console.log(data);
      if (data.success) {
        toast.success(`Category is deleted  successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Create Category - Ecommerce App"}>
      <div className="category-container">
        <div className="Catleft">
          <AdminMenu />
        </div>
        <div className="Catright">
          <h1> Manage Category </h1>
          <div className="cForm">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="table" style={{ border: "none" }}>
            <table>
              <thead style={{ border: "none" }}>
                <tr>
                  <th>Name </th>
                  <th colSpan={"2"}>Actions </th>
                </tr>
              </thead>
              <tbody style={{ border: "none" }}>
                {categories?.map((c) => (
                  <tr>
                    <td key={c._id} style={{ border: "none", padding: "5px" }}>
                      {c.name}
                    </td>
                    <td style={{ border: "none" }}>
                      <button
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                        className="Category-Edit"
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{ border: "none" }}>
                      <button
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                        className="Category-Del"
                        style={{ border: "none" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
