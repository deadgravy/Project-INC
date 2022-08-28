import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();
  const isAuth = auth || localStorage.getItem('user');
  const role = localStorage.getItem('role');

  return isAuth && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to='/unauthorized' />
  ) : (
    <Navigate to='/' replace />
  ); // else return to login page
};

export default RequireAuth;
