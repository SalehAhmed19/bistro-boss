import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import Swal from "sweetalert2";

export default function SignUp() {
  const { createUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggeduser = result.user;
      console.log(loggeduser);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  // console.log(watch("example"));

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex">
          <div className="text-center lg:text-left md:w-1/2">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 bg-base-100 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  name="name"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  name="email"
                />
                {errors.name && (
                  <span className="text-red-500">Email is required</span>
                )}
                <label className="label">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                  })}
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
    </>
  );
}
