import { Layout } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { resetAuth } from '../../lib/store/auth.slice';
import Footer from '../common/Footer.components';

function AuthLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.regStatus) {
        navigate('/');
      } else {
        navigate('/setup');
      }
    }

    dispatch(resetAuth());
  }, [currentUser]);

  return (
    <Layout
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}
    >
      <Outlet />
      <Footer />
    </Layout>
  );
}

export default AuthLayout;
