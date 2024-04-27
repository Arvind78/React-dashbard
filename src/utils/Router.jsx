import {createBrowserRouter } from 'react-router-dom';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Dashboard from '../components/dashboard/Dashboard';

const isLogin = localStorage.getItem('token');
const Router = createBrowserRouter([
    {
        path: '/',
        element:(isLogin) ? <Dashboard/> :<Login/>
    },
    {
        path: '/signup',
        element:<Signup/> 
    }
   
])

export default Router;