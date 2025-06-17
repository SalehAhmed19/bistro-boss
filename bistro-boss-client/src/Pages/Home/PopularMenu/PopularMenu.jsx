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
    </section>
  );
}
