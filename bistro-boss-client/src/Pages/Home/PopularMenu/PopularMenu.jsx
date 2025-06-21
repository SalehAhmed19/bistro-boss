import SectionTitle from "@/components/SectionTitle/SectionTitle";
import MenuItem from "@/components/MenuItem/MenuItem";
import { useMenu } from "@/Hooks/useMenu";

export default function PopularMenu() {
  const [menus] = useMenu();
  const popular = menus.filter((menu) => menu.category === "popular");
  return (
    <section>
      <SectionTitle title={"From our menu"} subtitle={"Popular Items"} />

      <div className="grid md:grid-cols-2 gap-5">
        {popular.map((menu) => (
          <MenuItem menu={menu} key={menu._id} />
        ))}
      </div>

      <button className="btn btn-outline mt-5 uppercase border-0 border-b-4 block mx-auto mb-10">
        View Full Menu
      </button>
    </section>
  );
}
