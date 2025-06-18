import { Helmet } from "react-helmet-async";
import SectionCover from "../../../components/SectionCover/SectionCover";
import coverImg from "../../../assets/menu/menu-bg.jpg";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";
import { useMenu } from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

export default function Menu() {
  const [menus] = useMenu();
  const deserts = menus.filter((menu) => menu.category === "dessert");
  const pizza = menus.filter((menu) => menu.category === "pizza");
  const soup = menus.filter((menu) => menu.category === "soup");
  const salad = menus.filter((menu) => menu.category === "salad");
  const offered = menus.filter((menu) => menu.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>
      {/* main cover */}
      <SectionCover img={coverImg} title={"Our Menu"} />
      <SectionTitle title={"Today's Offer"} subtitle={"Don't miss"} />

      <MenuCategory menus={offered} />
      <MenuCategory menus={deserts} title={"dessert"} coverImg={dessertBg} />
      <MenuCategory menus={pizza} title={"pizza"} coverImg={pizzaBg} />
      <MenuCategory menus={salad} title={"salad"} coverImg={saladBg} />
      <MenuCategory menus={soup} title={"soup"} coverImg={soupBg} />
    </div>
  );
}
