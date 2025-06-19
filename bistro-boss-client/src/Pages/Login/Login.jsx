import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  const [disable, setDisable] = useState(true);
  const [validate, setValidate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log({ email }, { password });
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Logged In!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisable(false);
      setValidate(true);
    } else {
      setDisable(true);
      setValidate(false);
    }
  };

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
          <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  className="input w-full"
                  placeholder="Enter captcha"
                  name="captcha"
                />
                <p
                  className={`btn btn-xs ${
                    validate ? "btn-success" : "btn-neutral"
                  } btn-dash`}
                >
                  Validate Captcha
                </p>
                <input
                  disabled={disable}
                  className="btn btn-neutral mt-4"
                  type="submit"
                  value="Login"
                />
              </fieldset>
            </form>
            <p className="p-5 text-sm">
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
