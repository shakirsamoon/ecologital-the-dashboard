import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getCurrentUser } from '../../lib/store/auth.slice';

function RootLayout() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch, token]);

  return <Outlet />;
}

export default RootLayout;
