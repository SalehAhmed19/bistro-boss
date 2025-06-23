import { FaMoneyBill, FaRegEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

export default function ManageItems() {
  return (
    <div>
      <SectionTitle title={"Manage All Items"} subtitle={"Admin Panel"} />
      <div>
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-2xl font-bold uppercase">Total Item: 6</h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {/* {cart.map((item) => ( */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            // src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Name</div>
                        <div className="text-sm opacity-50">id</div>
                      </div>
                    </div>
                  </td>
                  <td>$ </td>

                  <th>
                    <button
                      // onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost bg-[#D0A054]"
                    >
                      <FaRegEdit className="text-white" />
                    </button>
                  </th>

                  <th>
                    <button
                      // onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </th>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
