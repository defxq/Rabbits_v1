import { useRef, useState, useEffect } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import useInputStorage from "../../hooks/useInputStorage";
import useInput from "../../hooks/useInput";
import PersistLoginToggle from "./PersistLoginToggle";
// import { persistor } from "../../app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";


// build hooks and registerpage after this and then logoutbutton and then requied auth and then 
// persistlogin and then required auth advance with roles

const LoginPage = () => {
    const userRef = useRef();
    const [username, resetUsername, usernameAttribs] = useInputStorage("user", "");
    const [password, resetPassword, passwordAttribs] = useInput("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [login, { isLoading }] = useLoginMutation(); 
    const location = useLocation();

    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    
    useEffect(() => {
        if (token) {
            toast.success("You're already logged in");
            navigate("/", { replace: true });
        }
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!username || !password) {
                toast.error("Both username and password are required!");
                return;
            }
            const result = await login({ username, password }).unwrap();
            dispatch(setCredentials(result));
            resetUsername();
            resetPassword();
            toast.success("You have successfully logged in!");
            navigate("/welcome", { replace: true });
        } catch (err) {
            if (err.status === 400) {
                toast.error("Wrong username or password");
            } else {
                toast.error("Server is down at the moment...");
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };


  return (
    <div>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <div>
            <input
                type="text"
                placeholder="username"
                id="username"
                autoComplete="off"
                required
                ref={userRef}
                {...usernameAttribs}
                />
            </div>
            <label htmlFor="password">Password:</label>
            <div>
            <input
                type="password"
                placeholder="password"
                id="password"
                required
                {...passwordAttribs}
            />
            </div>
            <button className="btn" style={{ marginTop: "10px" }} type="submit" disabled={loading || isLoading}>{loading || isLoading ? "Logging-in.." : "Log in"}</button>
        </form>
        <PersistLoginToggle />
        <p>Don't have an account yet?&nbsp;
            <Link to="/signup" replace state={{ from: location }}>Sign-Up</Link>
        </p>
    </div>
  )
}
export default LoginPage