import { Link } from "react-router-dom";
import "./Header.css"
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedUser } from "../store/reducers/auth";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function Header() {
  const loggedUser = useSelector(state => state.auth.loggedUser);
  const dispatch = useDispatch();
  const socket = socketIOClient(ENDPOINT);
  const logout = () => {
    localStorage.removeItem("TOKEN")
    dispatch(setLoggedUser(null));

    socket.emit("logout");
  }
  return (
    <nav className="Header">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/userList">User list</Link></li>
        {!loggedUser && <li><Link to="/logIn">Se connecter</Link></li>}
        {!loggedUser && <li><Link to="/signIn">S'inscrire</Link></li>}
        {loggedUser && <button onClick={logout}>Se deconnecter</button>}
      </ul>
    </nav>
  );
}

export default Header;
