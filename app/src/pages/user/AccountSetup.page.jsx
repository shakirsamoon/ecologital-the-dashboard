import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Select,
  Typography,
} from 'antd';
import { useEffect } from 'react';
import Footer from '../../components/common/Footer.components';
import Header from '../../components/common/Header.component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetAuth, setupUserAccount } from '../../lib/store/auth.slice';
import LoadingBlock from '../../components/LoadingBlock.component';

function AccountSetupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isSuccess, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (currentUser && currentUser.regStatus) {
      navigate('/');
    }

    dispatch(resetAuth());
  }, [isSuccess, currentUser, dispatch, navigate]);

  const onFormSubmit = (values) => {
    console.log('Success:', values);
    dispatch(setupUserAccount({ token, data: values }));
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <Layout>
      <Header title="Setup your account" />
      <main
        style={{
          margin: '40px auto',
        }}
      >
        <Card
          bordered={true}
          style={{
            maxWidth: '900px',
            minHeight: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row align="middle" justify="center" style={{ width: '100%' }}>
            <Col
              span={11}
              style={{
                textAlign: 'center',
                padding: '0 10px',
              }}
            >
              <Typography.Title level={3} style={{ marginBottom: '30px' }}>
                Welcome to The Dashboard,
                <br />
                {currentUser?.name}
              </Typography.Title>

              <Typography.Paragraph
                style={{ fontSize: '1.2rem', marginBottom: '80px' }}
              >
                Thank you for registering with us.
              </Typography.Paragraph>

              <span
                style={{
                  backgroundColor: '#00abfb',
                  fontSize: '2rem',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                The Dashboard
              </span>
            </Col>

            <Col
              span={13}
              style={{ borderLeft: '1px solid #ccc', padding: '0 20px' }}
            >
              <Typography.Title
                level={2}
                style={{ textAlign: 'center', marginBottom: '30px' }}
              >
                Let's setup your account.
              </Typography.Title>

              <Form
                name="signup-from"
                onFinish={onFormSubmit}
                onFinishFailed={onFormSubmitFailed}
                autoComplete="off"
                disabled={isLoading}
                style={{
                  margin: '0 auto',
                }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a Username!',
                    },
                  ]}
                >
                  <Input
                    prefix={<p>@</p>}
                    placeholder="Enter a username"
                    maxLength={12}
                  />
                </Form.Item>

                <Form.Item
                  label="Headline (Describe yourself briefly)"
                  name="headline"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter a Headline!',
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Headline"
                    showCount
                    maxLength={100}
                  />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your Gender!',
                    },
                  ]}
                >
                  <Select placeholder="Select your gender">
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
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
                    Done
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </main>
      <Footer />
    </Layout>
  );
}

export default AccountSetupPage;
