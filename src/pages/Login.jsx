import {Button, TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../store/reducers/auth';
import config from "../config"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = config.url;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const socket = socketIOClient(ENDPOINT);

  const onLogin = async () => {
    try {
      let token = await axios.post(`${url}/auth`, {email, password});
      localStorage.setItem("TOKEN", token.data.token)
      let loggedUser = await axios.get(`${url}/api/users/105/info`, { headers: { Authorization: `Bearer ${token.data.token}`}})
      let user = loggedUser.data;
      
      dispatch(setLoggedUser(user))
      navigate('/')
      socket.emit("user login", user);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onLogin}>Se connecter</Button>
    </>

  );
}

export default Login;
