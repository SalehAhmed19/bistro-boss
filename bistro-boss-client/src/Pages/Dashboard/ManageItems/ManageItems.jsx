import { FaMoneyBill, FaRegEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function ManageItems() {
  const [refetch, menus] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteMenu = (menu) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Want to delete this ${menu.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete/menus/${menu._id}`);

        // console.log(res.data);

        if (res.data.deletedCount > 0) {
          // console.log(res);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${menu.name} has been deleted.`,
            icon: "success",
          });
        }
        // console.log(res);
      }
    });
    // console.log(menu._id);
  };
  return (
    <div>
      <SectionTitle title={"Manage All Items"} subtitle={"Admin Panel"} />
      <div>
        <div className="flex items-center justify-between gap-5">
          <h2 className="text-2xl font-bold uppercase">
            Total Item: {menus.length}
          </h2>
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
                  <th>Update</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {menus.map((menu) => (
                  <tr key={menu._id}>
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
                      <Link to={`/dashboard/update-menu/${menu._id}`}>
                        <button
                          // onClick={() => handleDelete(item._id)}
                          className="btn btn-ghost bg-[#D0A054]"
                        >
                          <FaRegEdit className="text-white" />
                        </button>
                      </Link>
                    </th>

                    <th>
                      <button
                        onClick={() => handleDeleteMenu(menu)}
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
