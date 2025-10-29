import { Link } from "react-router";
import LogoutButton from "../features/auth/LogoutButton";
import useAuth from "../hooks/useAuth";



const NavBar = () => {
    const {user, isAuthorized} = useAuth();
  return (
    <nav>
        <Link to="/">Main Page</Link>
    </nav>
  )
}
export default NavBar