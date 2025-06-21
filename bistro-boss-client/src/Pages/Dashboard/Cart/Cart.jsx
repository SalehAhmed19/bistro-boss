import SectionTitle from "@/components/SectionTitle/SectionTitle";
import useCarts from "@/Hooks/useCarts";
import Swal from "sweetalert2";

import { FaMoneyBill, FaTrash } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
export default function Cart() {
  const [cart, refetch] = useCarts();
  const totalPrice = cart.reduce((totat, item) => totat + item.price, 0);

  const axiosSecure = useAxios();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res) {
            console.log(res);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <SectionTitle title={"Wanna add more?"} subtitle={"My Cart"} />
      <div>
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-2xl font-bold uppercase">
            Total Orders: {cart.length}
          </h2>
          <h2 className="text-2xl font-bold uppercase">
            Total Orders: {totalPrice}
          </h2>
          <button className="btn flex">
            Pay Now <FaMoneyBill className="text-orange-400" />
          </button>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm opacity-50">
                            {item.foodId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.email}
                      <br />
                      {/* <span className="badge badge-ghost badge-sm">
                        $ {item.price}
                      </span> */}
                    </td>
                    <td>$ {item.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
