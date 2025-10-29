import { useGetAllUsersQuery } from "../features/users/usersApiSlice";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const UsersList = () => {
    const {data: users, isLoading, isError, isSuccess} = useGetAllUsersQuery();

    const usersList = isLoading ? 
        (<p>Loading...</p>)
        : isSuccess
        ?
        users.map(user => (
            <div key={user._id}>
            <p>Username: {user.username}</p>
            <p>Id: {user._id}</p>
            <p>Roles: {user.roles}</p>
            <p>Last seen logged-in at:&nbsp;{formatDistanceToNow(parseISO(user.updatedAt))} ago</p>
            <p>Account created at:&nbsp;
                {`${format(parseISO(user.createdAt), "yyyy-MM-dd | HH:mm:ss")}
                (${formatDistanceToNow(parseISO(user.createdAt))} ago)`}
            </p>
            <hr />
        </div>
    )) : (<p>Error...</p>)
  return (
    <div>
        <h2>Users List</h2>
        <hr />
        {usersList}
    </div>
  )
}
export default UsersList