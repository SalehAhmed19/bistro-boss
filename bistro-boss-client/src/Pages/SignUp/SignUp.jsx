import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
  const [disable, setDisable] = useState(true);
  const [validate, setValidate] = useState(false);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex">
        <div className="text-center lg:text-left md:w-1/2">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shadow-2xl">
          <form className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Name"
                name="name"
              />
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

              <input
                // disabled={disable}
                className="btn btn-neutral mt-4"
                type="submit"
                value="Sign Up"
              />
            </fieldset>
          </form>
          <p className="p-5 text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-orange-400 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
