import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../../components/MenuItem/MenuItem";

export default function PopularMenu() {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === "popular");
        setMenus(popularItems);
      });
  }, []);
  return (
    <section>
      <SectionTitle title={"From our menu"} subtitle={"Popular Items"} />

      <div className="grid md:grid-cols-2 gap-5">
        {menus.map((menu) => (
          <MenuItem menu={menu} key={menu._id} />
        ))}
      </div>

      <button className="btn btn-outline mt-5 uppercase border-0 border-b-4 block mx-auto mb-10">
        View Full Menu
      </button>
    </section>
  );
}
