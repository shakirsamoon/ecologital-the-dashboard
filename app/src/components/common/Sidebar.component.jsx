import {
  DashboardOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  {
    key: '1',
    icon: (
      <NavLink to="/">
        <DashboardOutlined />
      </NavLink>
    ),
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: (
      <NavLink to="/profile">
        <UserOutlined />
      </NavLink>
    ),
    label: 'Profile',
    children: [
      {
        key: '3',
        icon: <NavLink to="/profile"></NavLink>,
        label: 'My Profile',
      },
      {
        key: '4',
        icon: <NavLink to="/profile/edit"></NavLink>,
        label: 'Edit Profile',
      },
    ],
  },
];

const adminSidebarItems = [
  {
    key: '5',
    icon: (
      <NavLink to="/users">
        <TeamOutlined />
      </NavLink>
    ),
    label: 'Users',
    children: [
      {
        key: '6',
        icon: <NavLink to="/users"></NavLink>,
        label: 'All Users',
      },
      {
        key: '7',
        icon: <NavLink to="/users/new"></NavLink>,
        label: 'New User',
      },
    ],
  },
];

function Sidebar() {
  const { currentUser, isSuccess } = useSelector((state) => state.auth);
  const [smallLogo, setSmallLogo] = useState(true);

  const onBreakPoint = (value) => {
    // console.log('breakpoint', value);
    if (smallLogo !== value) {
      setSmallLogo(!smallLogo);
    }
  };

  const onCollapse = (value) => {
    // console.log('collapse', value);
    if (smallLogo !== value) {
      setSmallLogo(!smallLogo);
    }
  };

  const getSideBarItems = () => {
    if (currentUser?.type === 'admin')
      return [...sidebarItems, ...adminSidebarItems];
    else return sidebarItems;
  };

  return (
    <Layout.Sider
      // trigger={null}
      collapsible
      breakpoint="md"
      collapsedWidth="60"
      style={{ minHeight: '100dvh' }}
      onBreakpoint={onBreakPoint}
      onCollapse={onCollapse}
    >
      <div
        className="logo"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white' }}>
          {smallLogo ? 'TD' : 'The Dashboard'}
        </p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // defaultSelectedKeys={['1']}
        items={getSideBarItems()}
        defaultOpenKeys={['2', '5']}
        onClick={(e) => {}}
      />
    </Layout.Sider>
  );
}

export default Sidebar;
