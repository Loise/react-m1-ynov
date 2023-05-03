import { Outlet } from 'react-router-dom';
import NewUser from './pages/NewUser'
import Login from './pages/Login'
import Header from './components/Header';
import UserList from './pages/UserList';
import User from './pages/User';
import Home from './pages/Home';
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = () => [
  {
    element: <Layout />,
    children: [{
      path: "*",
      element: <p>Error</p>,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/userList",
      element: <UserList />,
    },
    {
      path: "user/:userId",
      element: <>{PrivateRoute(<User />)}</>
    },
    {
      path: "signIn",
      element: <>{GuestRoute(<NewUser />)}</>
    },
    {
      path: "logIn",
      element: <>{GuestRoute(<Login />)}</>
    }
    ]
  }
];

export default routes;