import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import LoginEmail from "../Pages/Login/LoginEmail";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Reviews from "../Pages/Dashboard/Reviews/Reviews";
import Orders from "../Pages/Dashboard/MyOrders/Orders";
import LoginLayout from "../Layout/LoginLayout";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
      },
      {
        path: "authentication",
        element: <LoginLayout />,
        children: [
          {
            path: "login-email",
            element: <LoginEmail />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard", // Corrected typo
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "user-home", element: <UserHome /> },
      { path: "cart", element: <Cart /> },
      { path: "reservation", element: <Reservation /> },
      { path: "reviews", element: <Reviews /> },
      { path: "orders", element: <Orders /> },
      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-items",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "manage-items",
        element: (
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ], // Changed to relative path
  },
]);
