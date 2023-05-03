import { useParams } from 'react-router-dom';
import config from "../config";
import { useEffect, useState } from 'react';
import axios from "axios"

function User() {
  let { userId } = useParams();
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (userId) {
      const url = `${config.url}/api/users/${userId}`
      async function getUser() {
        let response = await axios.get(
          url,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        setUser(response.data)
      }
      getUser();
    }
  }, [userId])

  return (
    <>
      <div>Id: {userId}</div>
      <div>
        {user.nickname}
      </div>
      <div>
        {user.email}
      </div>
      <div>
        owned groupes :
        {user.ownedGroups.map((g) => g)}
      </div>
      <div>
        subscribed groupes :
        {user.subscribedGroups.map((g) => g)}
      </div>

    </>

  );
}

export default User;
