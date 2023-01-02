import { Card, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header.component';
import UserDataEditForm from '../../components/UserDataEditForm.component';

function UserProfileEditPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <main>
      <Header title="Edit Profile" />
      <Card
        bordered={true}
        style={{
          maxWidth: '700px',
          width: '100%',
          margin: '20px auto',
          padding: '5px',
          border: 'dashed 3px #333',
        }}
      >
        <Row>
          <Col span={12}>
            <Typography.Paragraph style={{ fontSize: '1.2rem' }}>
              Email: <strong>{currentUser?.email ?? ''}</strong>
            </Typography.Paragraph>
          </Col>
          <Col span={12}>
            <Typography.Paragraph style={{ fontSize: '1.2rem' }}>
              Username: <strong>@{currentUser?.username ?? ''}</strong>
            </Typography.Paragraph>
          </Col>
        </Row>
      </Card>
      {/*<UserAuthEditForm />*/}
      <UserDataEditForm />
    </main>
  );
}

export default UserProfileEditPage;
