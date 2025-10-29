import useAuth from "../../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router";

const RequiredAuth = ({ allowedRoles }) => {
    const [user, isAuthorized] = useAuth();
    const location = useLocation();

  return (
    <>
        {allowedRoles.find(role => role.includes(user.roles))
        ? <Outlet />
        : isAuthorized
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
        }
    </>
  )
}
export default RequiredAuth;