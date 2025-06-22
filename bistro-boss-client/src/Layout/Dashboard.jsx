import { NavLink, Outlet } from "react-router";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaMailBulk,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import useCarts from "../Hooks/useCarts";

export default function Dashboard() {
  const [cart] = useCarts();
  // TODO: get isAdmin value form the db
  const isAdmin = true;

  const userMenu = (
    <>
      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/user-home">
          <FaUser /> User Home
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/cart">
          <FaShoppingCart /> My Cart
          <span className="font-bold badge badge-dash">{cart.length}</span>
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
        <NavLink className="flex items-center gap-2" to="/dashboard/reviews">
          <FaAd /> Reviews
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/orders">
          <FaList /> Orders
        </NavLink>
      </li>
    </>
  );

  const adminMenu = (
    <>
      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/admin-home">
          <MdAdminPanelSettings /> Admin Home
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/add-items">
          <FaUtensils /> Add Items
          {/* <span className="font-bold badge badge-dash">{cart.length}</span> */}
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink
          className="flex items-center gap-2"
          to="/dashboard/manage-items"
        >
          <FaList /> Manage Items
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink
          className="flex items-center gap-2"
          to="/dashboard/manage-bookings"
        >
          <FaBook /> Manage Bookings
        </NavLink>
      </li>

      <li className="text-white py-2">
        <NavLink className="flex items-center gap-2" to="/dashboard/all-users">
          <FaUsers /> All Users
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex">
      {/* Dashboard sidebar */}
      <div className="w-[280px] min-h-screen bg-orange-400 p-5">
        <h2 className="text-2xl font-bold uppercase">Bistro Boss</h2>
        <h3 className="text-xl uppercase">Restasurant</h3>
        <div className="divider"></div>
        <ul>
          {isAdmin ? adminMenu : userMenu}
          {/* Shared*/}
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

          <li className="text-white py-2">
            <NavLink className="flex items-center gap-2" to="/order/salad">
              <FaMailBulk /> Contact
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
