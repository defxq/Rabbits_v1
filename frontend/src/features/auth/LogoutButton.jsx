// dispatch logout and call lazy logout
import { useDispatch } from "react-redux";
import { useLazyLogoutQuery } from "./authApiSlice"
import { logout } from "./authSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
// import { persistor } from "../../app/store/store";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const [triggerLogout, { isLoading }] = useLazyLogoutQuery();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            triggerLogout();
            dispatch(logout());
            toast.success("Successfully logged out!");
            navigate('/', { replace: true });
        } catch (err) {
            console.error(err);
            toast.success("Failed logged out!");
        } finally {
            localStorage.removeItem("forget");
            sessionStorage.removeItem("user");
            // persistor.flush();
            // persistor.purge();
        }

    };

  return (
    <button className="btn-red" type="button" onClick={handleLogout}>Logout</button>
  )
}
export default LogoutButton