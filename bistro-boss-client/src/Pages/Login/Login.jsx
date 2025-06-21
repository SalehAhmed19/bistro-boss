// import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import Swal from "sweetalert2";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   LoadCanvasTemplateNoReload,
//   validateCaptcha,
// } from "react-simple-captcha";
// import { AuthContext } from "@/Providers/AuthContext";
// import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex">
          <div className="text-center lg:text-left md:w-1/2">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 bg-base-100 w-full max-w-sm pl-4 pr-4 pb-4 pt-10">
            {/* Email */}
            <Link to="/login-email">
              <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg
                  aria-label="Email icon"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="black"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                Login with Email
              </button>
            </Link>

            <div className="divider">OR</div>

            {/* Google */}
            <SocialLogin />
            <p className="p-5 text-sm text-center">
              New here?{" "}
              <Link to="/signup" className="text-orange-400 font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
