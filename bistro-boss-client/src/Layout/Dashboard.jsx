import { NavLink, Outlet } from "react-router";
import {
  FaAd,
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import useCarts from "../Hooks/useCarts";

export default function Dashboard() {
  const [cart] = useCarts();
  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-[280px] min-h-screen bg-orange-400 p-5">
        <h2 className="text-2xl font-bold uppercase">Bistro Boss</h2>
        <h3 className="text-xl uppercase">Restasurant</h3>
        <div className="divider"></div>
        <ul>
          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/dashboard/cart">
              <FaShoppingCart /> My Cart
              <span className="font-bold badge badge-dash">{cart.length}</span>
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
          <div className="divider"></div>
          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/">
              <FaHome /> Home
            </NavLink>
          </li>

          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/order/salad">
              <FaSearch /> Menu
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
