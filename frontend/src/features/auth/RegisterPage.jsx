import { useRef, useState, useEffect } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate, useLocation, Link } from "react-router";
import toast from "react-hot-toast";
import useInputStorage from "../../hooks/useInputStorage";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";


// build hooks and registerpage after this and then logoutbutton and then requied auth and then 
// persistlogin and then required auth advance with roles

const RegisterPage = () => {
    const userRef = useRef();
    const [username, resetUsername, usernameAttribs] = useInputStorage("user", "");
    const [password, resetPassword, passwordAttribs] = useInput("");
    const [matchPwd, resetMatchPwd, matchPwdAttribs] = useInput("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [register, { isLoading }] = useRegisterMutation(); 
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        if (token) {
            toast.success("You're already logged in")
            navigate("/", { replace: true });
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!username || !password || !matchPwd) {
                toast.error("Please input all the fields");
                return;
            } else if (!(matchPwd === password)) {
                toast.error("Your passwords are not matching!");
                return;
            }
            await register({ username, password }).unwrap();
            resetUsername();
            resetPassword();
            resetMatchPwd();
            toast.success("Successfully Signed Up!");
            navigate(from, { replace: true });
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
        <h2>Sign Up</h2>
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <div>
            <input
                type="text"
                placeholder="username"
                id="username"
                required
                autoComplete="off"
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
            <label htmlFor="matchPwd">Confirm Password:</label>
            <div>
            <input
                type="password"
                placeholder="Confirm Password"
                id="matchPwd"
                required
                {...matchPwdAttribs}
            />
            </div>
            <button style={{ marginTop: "10px" }}type="submit" disabled={loading || isLoading}>{loading || isLoading ? "Signning-Up.." : "Sign Up"}</button>
        </form>
        <p>Already have an account?&nbsp;
            <Link to="/login" replace state={{ from: location }}>Login</Link>
        </p>
    </div>
  )
}
export default RegisterPage;