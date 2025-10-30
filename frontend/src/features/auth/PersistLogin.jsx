import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { useLazyRefreshQuery, useLazyPingQuery } from "./authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken, setCredentials } from "./authSlice";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(selectCurrentToken);
    const [failed, setFailed] = useState(false);
    const [triggerRefresh] = useLazyRefreshQuery();
    const location = useLocation();
    const [triggerPing] = useLazyPingQuery();
    // fix refreshing everytime if you already have accesstoken in state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    
    
    useEffect(() => {
        const isPersist = JSON.parse(localStorage.getItem("persist")) || false;
        const persisting = async () => {
            try {
                const ping = await triggerPing();
                if (ping.status !== "fulfilled") {
                    setFailed(true);
                    return;
                } else if (token) {
                    return;
                } else if (!isPersist) {
                    return;
                }
                const result = await triggerRefresh();
                if (result?.status === "fulfilled") {
                    // console.log(result);
                    dispatch(setCredentials(result.data));
                } else {
                    return;
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        persisting();
    }, []);

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     console.log(`Authorized: ${isAuthorized}`);
    // }, [isLoading]);

  return (
    <>
        {isLoading
        ? <p>Loading...</p>
        : failed
        ? <p>Server is down at the moment...</p>
        : <Outlet />
        }
    </>
  )
}
export default PersistLogin