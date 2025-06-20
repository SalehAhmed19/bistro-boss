import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "@/Providers/AuthContext";

import { FaShoppingCart } from "react-icons/fa";
import useCarts from "@/Hooks/useCarts";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const [carts] = useCarts();

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        <Link to="dashboard/cart">
          <>
            Cart <FaShoppingCart />
            <div className="badge badge-sm badge-warning">+{carts.length}</div>
          </>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-black/25 fixed z-10 text-white max-w-screen-xl mx-auto backdrop-blur-xs">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Distro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      {user ? (
        <div className="navbar-end">
          <div className="avatar mr-4">
            <div className="mask mask-squircle w-12">
              <img src={user?.photoURL} />
            </div>
          </div>
          <span className="mr-4">{user?.displayName}</span>
          <button onClick={handleSignOut} className="btn">
            Signout
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <button className="btn">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
}
