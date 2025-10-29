import BackButton from "../components/BackButton";
import { useGetMeQuery } from "../features/users/usersApiSlice";
import LogoutButton from "../features/auth/LogoutButton";
// username roles
const AboutMe = () => {
    const {data: myInfo, isLoading, isError, isSuccess} = useGetMeQuery();
    // make the profile as a seperate component
    const profile = (
        <>
            <h2>Profile</h2>
            <hr />
            {
            isLoading
            ? (<p>Loading...</p>)
            : isSuccess
            ? (<div>
                <h3>Name: {myInfo.username}</h3>
                <p>Roles: {myInfo.roles}</p></div>)
            : (<p>Server might be down...</p>)
            }
        </>
        
    );
  return (
    <div>
        {profile}
        <LogoutButton/>
        <br />
        <br />
        <BackButton />
    </div>
  )
}
export default AboutMe