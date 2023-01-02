import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from 'antd';
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../lib/store/auth.slice';
import LoadingBlock from '../../components/LoadingBlock.component';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onFormSubmit = (values) => {
    console.log('Success:', values);
    dispatch(loginUser(values));
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <main style={{ padding: '50px 10px' }}>
      <Card
        bordered={true}
        style={{
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
          padding: '10px 20px',
        }}
      >
        <Row justify="center">
          <Typography.Title>Login</Typography.Title>
        </Row>
        <Divider />

        <Form
          name="login-form"
          onFinish={onFormSubmit}
          onFinishFailed={onFormSubmitFailed}
          autoComplete="off"
          disabled={isLoading}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your Email!',
              },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Entered email is not valid!',
                },
                {
                  required: true,
                  message: 'Please enter your Email!',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your Password!',
              },
            ]}
            labelCol={{ span: 24 }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              maxLength={12}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              style={{ width: '150px', height: '45px' }}
              disabled={false}
            >
              Log in
            </Button>
          </Form.Item>
          Not registered yet? <Link to="/signup">Create an Account</Link>
        </Form>
      </Card>
    </main>
  );
}

export default LoginPage;
