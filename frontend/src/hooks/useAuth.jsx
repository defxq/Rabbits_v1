import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let decoded;
  let isAuthorized = false;
  if (token) {
    decoded = jwtDecode(token);
  }
  const user = {};
  if (decoded) {
    isAuthorized = true;
    user.roles = decoded.UserInfo.roles;
    user.id = decoded.UserInfo.id;
    user.username = decoded.UserInfo.username;
  };

  return [user, isAuthorized];// next time use with {} 
}
export default useAuth;