import { Helmet } from "react-helmet-async";
import SectionCover from "../../../components/SectionCover/SectionCover";
import coverImg from "../../../assets/menu/menu-bg.jpg";
import PopularMenu from "../../Home/PopularMenu/PopularMenu";

export default function Menu() {
  return (
    <div>
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>

      <SectionCover img={coverImg} title={"Our Menu"} />

      <PopularMenu />
    </div>
  );
}
