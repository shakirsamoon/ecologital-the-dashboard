import { Button, Card, Layout, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/common/Header.component';
import UserProfileDataItem from '../../components/UserProfileDataItem.component';
import API_PATHS from '../../lib/constants/apiPaths.const';
import useFetchData from '../../lib/hooks/useFetchData.hook';
import LoadingBlock from '../../components/LoadingBlock.component';

function AdminUserPreviewPage() {
  const { token } = useSelector((state) => state.auth);
  let { id } = useParams();

  const { data, error, loading } = useFetchData(
    API_PATHS.ADMIN_GET_SINGLE_USER(id),
    token
  );

  if (loading) {
    return <LoadingBlock />;
  }

  return (
    <div>
      <Header title="User Preview" />
      <Layout>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <Card
            bordered={true}
            style={{
              maxWidth: '700px',
              width: '100%',
              margin: '20px auto',
              padding: '10px 20px',
            }}
          >
            <Row style={{ marginTop: '20px' }} justify="center">
              <Typography.Title level={2} style={{ marginBottom: '5px' }}>
                {data.user?.name ?? ''}
              </Typography.Title>
            </Row>

            <Row justify="center">
              <Typography.Paragraph>
                @{data.user?.username ?? ''}
              </Typography.Paragraph>
            </Row>

            <Row justify="center">
              <Typography.Paragraph>
                {data.user?.headline ?? ''}
              </Typography.Paragraph>
            </Row>

            <Row style={{ marginTop: '20px' }} gutter={30}>
              <UserProfileDataItem
                title="Email"
                data={data.user?.email ?? ''}
              />
              <UserProfileDataItem
                title="Password"
                data="•••••••••"
                left={false}
              />
            </Row>
            <Row gutter={30}>
              <UserProfileDataItem
                title="Gender"
                data={data.user?.gender ?? ''}
              />
            </Row>

            <Row justify="center" style={{ marginTop: '20px' }}>
              <Link to={`/users/${data.user._id}/edit`}>
                <Button type="primary">Edit this Profile</Button>
              </Link>
            </Row>
          </Card>
        )}
      </Layout>
    </div>
  );
}

export default AdminUserPreviewPage;
