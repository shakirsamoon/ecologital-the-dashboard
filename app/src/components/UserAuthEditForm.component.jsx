import { Button, Card, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserAuth } from '../lib/store/auth.slice';

function UserAuthEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isError, isSuccess, message, token } =
    useSelector((state) => state.auth);

  const onFormSubmit = (values) => {
    console.log('Success:', values);
    dispatch(updateUserAuth({ token, data: values }));
  };

  const onFormSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card
      style={{
        maxWidth: '700px',
        width: '100%',
        margin: '20px auto',
        padding: '10px',
        border: 'dashed 3px #333',
      }}
    >
      <Form
        name="auth-update-from"
        onFinish={onFormSubmit}
        onFinishFailed={onFormSubmitFailed}
        autoComplete="off"
        disabled={isLoading}
        style={{
          margin: '0 auto',
          //  maxWidth: '300px'
        }}
      >
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
          <Input.Password placeholder="Confirm your password" maxLength={12} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            style={{ minWidth: '150px', height: '45px' }}
            disabled={false}
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default UserAuthEditForm;
