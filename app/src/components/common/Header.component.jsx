import { UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../lib/store/auth.slice';

function Header({ title }) {
  const dispatch = useDispatch();
  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Layout.Header
      className="header"
      style={{
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: '30px 0',
      }}
    >
      <Typography.Title style={{ marginBottom: 0, fontSize: '1.8rem' }}>
        {title}
      </Typography.Title>
      <Menu
        items={[
          {
            key: '1',
            label: currentUser?.name ?? 'User',
            icon: <UserOutlined />,
            children: [
              {
                key: '2',
                label: 'Logout',
                onClick: onLogout,
              },
            ],
          },
        ]}
        theme="light"
        mode="horizontal"
      />
    </Layout.Header>
  );
}

export default Header;
