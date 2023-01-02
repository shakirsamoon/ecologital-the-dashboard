import { Outlet } from 'react-router-dom';

function AdminProtectedLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AdminProtectedLayout;
