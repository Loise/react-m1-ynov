import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function Home() {
  const [response, setResponse] = useState("");
  const usersConnected = useSelector(state => state.user.usersConnected);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <p>Users connected :</p>
      <ul>
        {
          usersConnected.map((u) => <li>{u.nickname}</li>)
        }
      </ul>
    </>
  );
}

export default Home;
