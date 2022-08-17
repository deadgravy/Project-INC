import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const isAuth = auth || localStorage.getItem('user');

  return isAuth ? ( // if email is returned, allow access to the pages
    <Outlet />
  ) : (
    <Navigate to='/' replace /> // else return to login page
  );
};

export default RequireAuth;
