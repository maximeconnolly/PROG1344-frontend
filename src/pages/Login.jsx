import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../store/authSlice";
import { notification, Form, Input, Button, Card, Typography} from "antd";

const { Title } = Typography;






const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {status, error} = useSelector((state) => state.auth);
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    const loginErrorNotification = () => {
      api.open({
        message: 'Login Error',
        description: 
        'Please check Username and Password'
      })
    }

  
    
    const submitForm = () => {
        dispatch(loginUser({ username, password }));
        if( status === "rejected" ) {

            loginErrorNotification();
            form.resetFields();
        }
        // const user = {
      //   Admin: "Admin",
      //   SuperUser: "SuperUser",
      //   Guest: "Guest"
      // }
      //   const username = values.username;
      //   const password = values.password;
      //   const isValid = username in user && user[username] == password
      //   if(isValid){
      //     dispatch(login({
      //       username: username,
      //       password: password
      //     }))
      //   } else{
      //     loginErrorNotification();
      //     form.resetFields();
      //   }
    };

    return (
      <>
        {contextHolder}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Card style={{ width: 350, textAlign: "center" }}>
            <Title level={3}>Login</Title>
            <Form name="login-form" onFinish={submitForm} form={form} layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                rules={[{ required: true, message: "Please enter your username!" }]}
              >
                <Input />
              </Form.Item>
    
              <Form.Item
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password />
              </Form.Item>
    
              <Button type="primary" disabled={status === 'loading'} htmlType="submit" block>
                Login
              </Button>
            </Form>
          </Card>
        </div>
        </>
      );
};

export default Login;