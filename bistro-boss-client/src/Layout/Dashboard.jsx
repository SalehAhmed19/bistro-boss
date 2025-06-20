import { NavLink, Outlet } from "react-router";
import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-[280px] min-h-screen bg-orange-400 p-5">
        <ul>
          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/dashboard/cart">
              <FaShoppingCart /> My Cart
            </NavLink>
          </li>

          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/dashboard/home">
              <FaHome /> Home
            </NavLink>
          </li>

          <li className="text-white py-2">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/reservation"
            >
              <FaCalendar /> Reservation
            </NavLink>
          </li>

          <li className="text-white py-2">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/reviews"
            >
              <FaAd /> Reviews
            </NavLink>
          </li>

          <li className="text-white py-2">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/myorders"
            >
              <FaList /> Orders
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
