import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useAdmin() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `users/authorization/admin/${user.email}`
      );

      return res.data.isAdmin;
    },
    enabled: !loading && !!user?.email, // Only run query if auth is not loading and user email exists
  });

  return [isAdmin, isAdminLoading];
}
