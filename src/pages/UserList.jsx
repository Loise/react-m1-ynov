import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers as setUsersReducer } from "../store/reducers/user"
import axios from "axios";
import config from "../config"

export const sortUsersByNickName = (users) => {
  return [...users].sort((a,b) => a.nickname.localeCompare(b.nickname))
}

function UserList() {
  const url = config.url
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const usersInternal = useSelector(state => state.user.users);

  const retrieveUsers = async () => {
    let response = await axios.get(`${url}/api/users`, { params: { page: 1 } });
    let usersTmp = response.data["hydra:member"]
    dispatch(setUsersReducer(usersTmp));
    setUsers(usersTmp);
  }

  useEffect(() => {
    if (usersInternal.length > 0) {
      setUsers(usersInternal);
    } else {
      retrieveUsers();
    }
  }, [])

  return (
    <>
     <h1>liste des utilisateurs</h1>
      {sortUsersByNickName(users).map((user) =>
        <div>
          <Link to={`/user/${user.id}`}>{user.nickname}</Link>
        </div>
      )}
    </>

  );
}

export default UserList;
