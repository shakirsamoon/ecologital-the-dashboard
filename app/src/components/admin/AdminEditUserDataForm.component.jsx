import { Button, Card, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import adminService from '../../lib/services/admin.service';

function AdminEditUserDataForm({ userData }) {
  const [loading, setLoading] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const onFormSubmit = (values) => {
    setLoading(true);
    adminService
      .updateUserData(token, userData._id, values)
      .then((res) => {
        navigate(`/users/${userData._id}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
        disabled={loading}
        style={{
          margin: '0 auto',
        }}
        initialValues={{
          name: userData?.name ?? '',
          headline: userData?.headline ?? '',
          gender: userData?.gender ?? '',
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a Name!',
            },
          ]}
        >
          <Input placeholder="Enter a Name" maxLength={12} />
        </Form.Item>

        <Form.Item
          label="Headline"
          name="headline"
          rules={[
            {
              required: true,
              message: 'Please enter a Headline!',
            },
          ]}
        >
          <Input.TextArea placeholder="Headline" showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
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
            loading={loading}
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

export default AdminEditUserDataForm;
