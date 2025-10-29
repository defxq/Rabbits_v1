import { useLocation, Link } from "react-router"
import useAuth from "../hooks/useAuth";
import LogoutButton from "../features/auth/LogoutButton";


const LinksPage = () => {
        const [user, isAuthorized] = useAuth();
  return (
    <div>
        <h2>Links List</h2>
        <ul>
            <li>
                <Link to="/">
                    Main Page
                </Link>
            </li>
            <li>
                <Link to="/welcome">
                    Welcome Page
                </Link>
            </li>
            <li>
                <Link to="/general">
                    General Page
                </Link>
            </li>
            <li>
                <Link to="/me">
                    Profile
                </Link>
            </li>
            <li>
                <Link to="/editor">
                    Editor Page
                </Link>
            </li>
            <li>
                <Link to="/admin">
                    Admin Page
                </Link>
            </li>
            <li>
                <Link to="/login">
                    Login
                </Link>
            </li>
            <li>
            <Link to="/signup">
                Sign Up 
            </Link>
            </li>
            <li>
            <Link to="/lounge">
                Lounge
            </Link>
            </li>
        </ul>
    </div>
  )
}
export default LinksPage