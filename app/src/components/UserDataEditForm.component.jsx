import { Button, Card, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from '../lib/store/auth.slice';

function UserDataEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isError, isSuccess, message, token } =
    useSelector((state) => state.auth);

  const onFormSubmit = (values) => {
    console.log('Success:', values);
    dispatch(updateUserData({ token, data: values }));
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
        name="user-data-update-from"
        onFinish={onFormSubmit}
        onFinishFailed={onFormSubmitFailed}
        autoComplete="off"
        disabled={isLoading}
        style={{
          margin: '0 auto',
          //  maxWidth: '300px'
        }}
        initialValues={{
          name: currentUser?.name ?? '',
          headline: currentUser?.headline ?? '',
          gender: currentUser?.gender ?? '',
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          labelCol={{span:24}}
          rules={[
            {
              required: true,
              message: 'Please enter a Name!',
            },
          ]}
        >
          <Input
            placeholder="Enter a Name"
            maxLength={12}
            // defaultValue={currentUser?.name ?? ''}
          />
        </Form.Item>

        <Form.Item
          label="Headline"
          name="headline"
          labelCol={{span:24}}
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
            // defaultValue={currentUser?.headline ?? ''}
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          labelCol={{span:24}}
          rules={[
            {
              required: true,
              message: 'Please select your Gender!',
            },
          ]}
        >
          <Select
            placeholder="Select your gender"
            // defaultValue={currentUser?.gender ?? ''}
          >
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
            style={{ minWidth: '150px', height: '45px' }}
            disabled={false}
          >
            Update User Data
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default UserDataEditForm;
