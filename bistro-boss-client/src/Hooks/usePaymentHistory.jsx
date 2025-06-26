import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function usePaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-payments/${user.email}`);

      // console.log(res);
      return res.data;
    },
  });
  return [refetch, payments];
}
