import { Outlet, useLocation } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

export default function Main() {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  const isSignup = location.pathname.includes("signup");

  const showNavFoot = isLogin || isSignup;
  return (
    <div>
      {showNavFoot || <Navbar />}
      <Outlet />
      {showNavFoot || <Footer />}
    </div>
  );
}
