import './App.css';
import LoginPage from "./views/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainFeed from './views/MainFeed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomNavBar from './components/NavBar';
import AccountPage from './views/Account';
import MyTickets from './views/Tickets'
import EmployeeManagement from './views/EmployeeManagement';
import EventCreation from './views/CreateEvent';
import Logs from './views/Logs';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainFeed></MainFeed>,
    },
    {
      path: "/account",
      element: <AccountPage></AccountPage>,
    },
    {
      path: "/my-tickets",
      element: <MyTickets></MyTickets>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/my-corporation",
      element: <EmployeeManagement></EmployeeManagement>,
    },
    {
      path: "/new-event",
      element: <EventCreation></EventCreation>,
    },{
      path: "/statistics",
      element: <EmployeeManagement></EmployeeManagement>,
    },
    {
      path: "/logs",
      element: <Logs></Logs>,
    },
  ]);
  return (
    <>
    <CustomNavBar></CustomNavBar>
     <RouterProvider router={router} />
      <ToastContainer>         
      </ToastContainer>
    </>
  );
}



export default App;
