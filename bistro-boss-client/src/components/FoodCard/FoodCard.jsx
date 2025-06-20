import { useLocation, useNavigate } from "react-router";
import { FaShoppingCart } from "react-icons/fa";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useCarts from "../../Hooks/useCarts";

export default function FoodCard({ item }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [, refetch] = useCarts();

  const axiosSecure = useAxios();

  const { _id, name, image, price, recipe } = item;
  const handleAddToCart = () => {
    if (user && user.email) {
      // send cart item to the database
      const cartItem = {
        foodId: _id,
        image: image,
        email: user.email,
        name: name,
        price: price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to cart!`,
            showConfirmButton: false,
            timer: 2000,
          });

          // refetch to update
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in :(",
        text: "Please login!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // send user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
    console.log({ user: user.email });
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-5 pt-5">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <p className="bg-black text-orange-400 absolute right-0 mr-2 mt-2 p-2 rounded-md">
        $ {price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>

        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline border-0 border-b-4 border-orange-400"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
