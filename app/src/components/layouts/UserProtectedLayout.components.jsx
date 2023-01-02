import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

function UserProtectedLayout() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default UserProtectedLayout;
