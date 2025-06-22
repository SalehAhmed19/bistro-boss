import { MdAdminPanelSettings } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import useGetUsers from "../../../Hooks/useGetUsers";

function AllUsers() {
  const [refetch, users] = useGetUsers();
  return (
    <div>
      <SectionTitle title={"Wanna add more?"} subtitle={"My Cart"} />
      <div>
        <h2 className="text-2xl font-bold uppercase">
          Total Users:
          {/* {cart.length} */}
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name / Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user?.photoURL}
                              alt={"Avatar Tailwind CSS Component"}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                          <div className="text-sm opacity-50">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-2xl bg-amber-100 inline-block p-2 rounded-full text-orange-400">
                        <MdAdminPanelSettings />
                      </div>
                    </td>
                    <th>
                      <button
                        //   onClick={() => handleDelete(item._id)}
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

export default AllUsers;
