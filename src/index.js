import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store'
import {
  BrowserRouter
} from "react-router-dom";
import axios from "axios"
import { setUsers } from './store/reducers/user';
import { setLoggedUser } from './store/reducers/auth';
import { setLoading } from './store/reducers/loading';
import config from "./config"
/*const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);*/

/*const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <App />
        ),
      },
      {
        path: "userList",
        element: <UserList />,
      },
      {
        path: "user/:userId",
        element: <User />,
      },
      {
        path: "signIn",
        element: GuestRoute(<NewUser />)
      },
      {
        path: "logIn",
        element: <Login />,
      }
    ]
  }
]);*/

const url = config.url

async function retrieveUsers() {
  try {
    let response = await axios.get(`${url}/api/users`, { params: { page: 5 } });
    let users = response.data["hydra:member"]
    store.dispatch(setUsers(users));
  } catch (e) {
    store.dispatch(setUsers([]));
  }

}

async function retrieveLoggedUser() {
  try {
    let token = localStorage.getItem("TOKEN");
    if(token) {
      let loggedUser = await axios.get(`${url}/api/users/105/info`, { headers: { Authorization: `Bearer ${token}` } })
      console.log(loggedUser.data);
      let user = loggedUser.data
      console.log(user);
      let userLogged = { nickname: user.nickname, id: user.id }
      store.dispatch(setLoggedUser(userLogged))
    }
  } catch (e) {
    localStorage.removeItem("TOKEN")
  }

}

Promise.all([retrieveLoggedUser(), retrieveUsers()]).finally(() => store.dispatch(setLoading(false)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>

  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
