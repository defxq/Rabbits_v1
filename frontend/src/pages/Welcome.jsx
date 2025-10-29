import { Link } from "react-router";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { selectCurrentToken } from "../features/auth/authSlice";
import LogoutButton from "../features/auth/LogoutButton";

const Welcome = () => {
    const [user, isAuthorized] = useAuth();
    const token = useSelector(selectCurrentToken);
    const Welcome = user.username ? `Welcome ${user.username}!` : "Welcome!";
    const tokenAbbr = `${token.slice(0, 9)}...`;

    const content = (
        <section>
            <h2>{Welcome}</h2>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/links">Links List</Link></p>
            {isAuthorized ? <LogoutButton /> : "Try logging in!"}
        </section>
    )
  return content;
}
export default Welcome