import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

// api, axios, axiosSecure, tanstack

export default function useCarts() {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { refetch, data: carts = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`carts?email=${user.email}`);
      return res.data;
    },
  });

  return [carts, refetch];
}
