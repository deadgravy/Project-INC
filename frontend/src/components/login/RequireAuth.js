import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const isAuth = auth || localStorage.getItem('user');
  const role = localStorage.getItem('role');

  // need to test smth

  return isAuth && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : isAuth ? (
    <Navigate to='/unauthorized' replace />
  ) : (
    <Navigate to='/' replace />
  ); // else return to login page
};

export default RequireAuth;
