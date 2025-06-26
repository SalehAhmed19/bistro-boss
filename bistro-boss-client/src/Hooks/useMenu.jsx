// import { useEffect, useState } from "react";

// export function useMenu() {
//   const [menus, setMenus] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     fetch("http://localhost:4000/api/menus")
//       .then((res) => res.json())
//       .then((data) => {
//         setMenus(data);
//         setLoading(false);
//       });
//   }, [menus]);

//   return [menus, loading];
// }
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export default function useMenu() {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: menus = [] } = useQuery({
    queryKey: "menus",
    queryFn: async () => {
      const res = await axiosPublic.get("/menus");

      // console.log(res.data);
      return res.data;
    },
  });

  return [refetch, menus];
}
