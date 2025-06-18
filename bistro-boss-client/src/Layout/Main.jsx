import { Outlet, useLocation } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

export default function Main() {
  const location = useLocation();
  const isLogin = location.pathname.includes("login");
  console.log(location);
  return (
    <div>
      {isLogin || <Navbar />}
      <Outlet />
      {isLogin || <Footer />}
    </div>
  );
}
