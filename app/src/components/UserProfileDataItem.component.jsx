import { Col, Typography } from 'antd';

function UserProfileDataItem({ title, data, left = true }) {
  return (
    <Col span={12} style={{ textAlign: !left ? 'left' : 'right' }}>
      <span style={{ color: 'dimgray' }}>{title}</span>
      <Typography.Paragraph strong>{data}</Typography.Paragraph>
    </Col>
  );
}

export default UserProfileDataItem;
