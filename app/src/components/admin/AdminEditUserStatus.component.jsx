import { Card, Col, Row, Typography } from 'antd';

function AdminEditUserStatus({ userData }) {
  return (
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
            Email: <strong>{userData?.email ?? ''}</strong>
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Paragraph style={{ fontSize: '1.2rem' }}>
            Username: <strong>@{userData?.username ?? ''}</strong>
          </Typography.Paragraph>
        </Col>
        <Col span={12}>
          <Typography.Paragraph style={{ fontSize: '1.2rem', color: 'blue' }}>
            Status:{' '}
            <strong>{userData?.status ? 'Active' : 'Inactive' ?? ''}</strong>
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  );
}

export default AdminEditUserStatus;
