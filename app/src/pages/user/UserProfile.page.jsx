import { Button, Card, Layout, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header.component';
import UserProfileDataItem from '../../components/UserProfileDataItem.component';

function UserProfilePage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <main>
      <Header title="User Profile" />
      <Layout>
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
              {currentUser?.name ?? ''}
            </Typography.Title>
          </Row>

          <Row justify="center">
            <Typography.Paragraph>
              @{currentUser?.username ?? ''}
            </Typography.Paragraph>
          </Row>

          <Row justify="center">
            <Typography.Paragraph>
              {currentUser?.headline ?? ''}
            </Typography.Paragraph>
          </Row>

          <Row justify="center">
            <Link to="/profile/edit">
              <Button type="primary">Edit Profile</Button>
            </Link>
          </Row>

          <Row style={{ marginTop: '20px' }} gutter={30}>
            <UserProfileDataItem
              title="Email"
              data={currentUser?.email ?? ''}
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
              data={currentUser?.gender ?? ''}
            />
          </Row>
        </Card>
      </Layout>
    </main>
  );
}

export default UserProfilePage;
