import { MdAdminPanelSettings } from "react-icons/md";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaTrash, FaUsers } from "react-icons/fa";
import useGetUsers from "../../../Hooks/useGetUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

function AllUsers() {
  const [refetch, users] = useGetUsers();
  const axiosSecure = useAxiosSecure();
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Want to delete this ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            console.log(res);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to make admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            console.log(res);
            refetch();
            Swal.fire({
              title: "Done!",
              text: `${user.name} is admin now!`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <SectionTitle title={"Total Users"} subtitle={"Admin Panel"} />
      <div>
        <h2 className="text-2xl font-bold uppercase">
          Total Users: {users.length}
        </h2>

        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name / Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <th className="text-[#747476]">{idx + 1}</th>
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
                      {user.role === "admin" ? (
                        <div className="font-bold text-2xl inline-block p-2 rounded-full border border-orange-100 text-[#D1A054]">
                          <MdAdminPanelSettings />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="font-bold text-2xl bg-amber-100 inline-block p-2 rounded-full text-[#D1A054] cursor-pointer"
                        >
                          <FaUsers />
                        </button>
                      )}
                    </td>
                    <th>
                      <button
                        onClick={() => handleDeleteUser(user)}
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
