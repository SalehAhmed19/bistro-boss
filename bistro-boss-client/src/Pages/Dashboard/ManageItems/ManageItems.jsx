import { FaMoneyBill, FaRegEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";

export default function ManageItems() {
  const [refetch, menus] = useMenu();
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
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {menus.map((menu) => (
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={menu.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{menu.name}</div>
                          <div className="text-sm opacity-50">{menu._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="uppercase">{menu.category}</td>
                    <td>$ {menu.price}</td>

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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
