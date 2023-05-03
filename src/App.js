import routes from './routes';
import { useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import { useDispatch } from 'react-redux';
import {setUsersConnected} from "./store/reducers/user.js"

const ENDPOINT = "http://127.0.0.1:4001";

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
     socket.on('new user list', data => {
      dispatch(setUsersConnected(data));
     });
  }, []);

  const routing = useRoutes(routes());
  return (
    <>
      {routing}
    </>
  );
}