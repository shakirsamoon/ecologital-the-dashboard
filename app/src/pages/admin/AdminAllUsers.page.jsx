import { Button, Layout, Space, Table, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header.component';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import useFetchData from '../../lib/hooks/useFetchData.hook';
import API_PATHS from '../../lib/constants/apiPaths.const';
import { useSelector } from 'react-redux';
import LoadingBlock from '../../components/LoadingBlock.component';

function AdminAllUsersPage() {
  const { token } = useSelector((state) => state.auth);

  const { data, error, loading } = useFetchData(
    API_PATHS.ADMIN_GET_ALL_USERS,
    token
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => value.toString(),
    },
    {
      title: 'Headline',
      dataIndex: 'headline',
      key: 'headline',
      render: (value) => value ?? '',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Link to={`/users/${record._id}`}>
            <Tooltip title="View User" placement="top">
              <Button type="primary" title="Edit">
                <EyeOutlined />
              </Button>
            </Tooltip>
          </Link>
          <Link to={`/users/${record._id}/edit`}>
            <Tooltip title="Edit User" placement="top">
              <Button type="primary">
                <EditOutlined />
              </Button>
            </Tooltip>
          </Link>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <LoadingBlock />;
  }

  return (
    <main>
      <Header title="All Users" />
      <Layout>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <Table
            style={{
              maxWidth: '800px',
              width: '100%',
              margin: '20px auto',
              padding: '10px 20px',
            }}
            columns={columns}
            dataSource={data.users}
          />
        )}
      </Layout>
    </main>
  );
}

export default AdminAllUsersPage;
