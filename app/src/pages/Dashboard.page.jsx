import { Card,  Typography } from 'antd';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header.component';
import LoadingBlock from '../components/LoadingBlock.component';

function DashboardPage() {
  const { currentUser, isLoading} = useSelector(
    (state) => state.auth
  );

  if (isLoading) {
    return <LoadingBlock />;
  }

  return (
    <main>
      <Header title="Dashboard" />
      <div style={{ padding: '10px' }}>
        <Card
          bordered={true}
          style={{
            maxWidth: '700px',
            width: '100%',
            margin: '20px auto',
            padding: '10px 20px',
          }}
        >
          <Typography.Title level={2}>
            Hi, {currentUser?.name ?? `User`}!
          </Typography.Title>
          <Typography.Paragraph style={{ fontSize: '1.3rem' }} strong>
            Welcome to The Dashboard.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            tempora ex magnam quia minima, dolores veniam dolor! Veritatis, fuga
            pariatur omnis voluptas exercitationem, praesentium, dolore deleniti
            doloribus a incidunt autem!
          </Typography.Paragraph>
        </Card>
      </div>
    </main>
  );
}

export default DashboardPage;
