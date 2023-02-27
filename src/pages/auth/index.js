import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Row,
    Spin,
    Typography,
  } from "antd";

  import { useRouter } from "next/router";
  import React, { useEffect, useState } from "react";



 

  const Auth = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
   
    function handleClick() {
  
        router.push('/layout');
      }
    
    return (
      <Row justify="center" align="middle" style={{ backgroundColor: "#f5f8fb" }} >
     
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          style={{ backgroundColor: "#f5f8fb" }}
        >
          <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col xs={20} sm={18} md={18} lg={16} xl={14} xxl={14}>
              <Typography.Title level={2}>
                Sign in
              </Typography.Title>
             
             
              <Form
                form={form}
                // onFinish={(e) => loginMutation.mutate(e)}
                name="control-ref"
                layout="vertical"
                requiredMark={false}
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: false,
                      message: "Invalid Email!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Email"></Input>
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: false,
                      message: "Invalid Email!",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                  ></Input.Password>
                </Form.Item>
               
                <Button
               onClick={handleClick}
                  htmlType="submit"
                  size="large"
                  type="primary"
                  style={{ width: "100%", marginTop: 20 }}
                //   loading={loginMutation.isLoading}
                >
                  Sign In
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };
  
  export default Auth;
  