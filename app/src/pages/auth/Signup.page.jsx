import { Button, Card, Divider, Form, Input, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../lib/store/auth.slice';
import LoadingBlock from '../../components/LoadingBlock.component';

function SignupPage() {
  const dispatch = useDispatch();

  const { isLoading, message } = useSelector((state) => state.auth);

  const onFormSubmit = (values) => {
    const { 'confirm-password': _, ...userData } = values;
    dispatch(registerUser(userData));
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <div>
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
            <Typography.Title>Create an Account</Typography.Title>
          </Row>
          <Divider />

          <Form
            name="signup-from"
            onFinish={onFormSubmit}
            onFinishFailed={onFormSubmitFailed}
            autoComplete="off"
            disabled={isLoading}
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <Form.Item
              label="Name"
              name="name"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please enter your Name!',
                },
              ]}
            >
              <Input placeholder="Enter your name" maxLength={50} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
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
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please enter a password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter a password" maxLength={12} />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm-password"
              dependencies={['password']}
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Confirm your password"
                maxLength={12}
              />
            </Form.Item>
            {message && (
              <Typography.Paragraph
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: '1.1rem',
                }}
                strong
              >
                {message}
              </Typography.Paragraph>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                style={{ width: '150px', height: '45px' }}
                disabled={false}
              >
                Register
              </Button>
            </Form.Item>
            Already have an account? <Link to="/login">Login</Link>
          </Form>
        </Card>
      </main>
    </div>
  );
}

export default SignupPage;
