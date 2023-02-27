import {
  Button,
  Modal,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Spin,
  Typography,
} from "antd";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();



function Layout({ Component, pageProps }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form1] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${id}`);
      console.log(response);
      console.log(response.data);
      // Update the products array with the deleted product removed
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsEditMode(true);
    form1.setFieldsValue({ ...product }); // set form values using a new object with the same properties
  };

  const ProductList = useQuery("products", async () => {

    const response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
    return response.data;
  });

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${selectedProduct.id}`, values);
      setProducts(products.map((product) => (product.id === selectedProduct.id ? response.data : product)));
      setSelectedProduct(null);
      setIsModalOpen(false);
      message.success("Product updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to update product");
    }
  };

  const handleAddProduct = async (values) => {


    try {
      const response = await axios.post("https://dummyjson.com/products/add", values);
      setProducts([...products, response.data]);
      setIsModalOpen(false);
 
      message.success("Product added successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to add product");
    }
  };


  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Action",
      render: (text, product) => (
        <>
          <Button type="danger" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
          <Button type="primary" onClick={() => {
           
            handleEdit(product);
          }}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Row justify="center" align="middle" style={{ backgroundColor: "#f5f8fb" }} >
     
    <Col
      xs={24}
      sm={24}
      md={18}
      lg={16}
      xl={14}
      xxl={14}
      style={{ backgroundColor: "#f5f8fb" }}
    >
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col xs={20} sm={18} md={18} lg={16} xl={14} xxl={14}>
      <Button style={{marginBottom : "20px", float: "right" , alignItems : "flex-end"}} type="primary" onClick={() => {
        form1.resetFields();
        setIsModalOpen(true);
      }}>Add Product</Button>
      <Table columns={columns} dataSource={products} />
      <Modal
      centered
        title={selectedProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProduct(null); // clear selected product on cancel
          setIsEditMode(false); // set edit mode to false
        }}
        footer={null}
      >
        <Form form={form1} onFinish={selectedProduct ? handleUpdate : handleAddProduct}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter a price" }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please enter a stock" }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedProduct ? "Update" : "Add"}
          </Button>

        </Form>
      </Modal>  </Col> </Row>
     </Col> </Row>
  );
}


function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;



