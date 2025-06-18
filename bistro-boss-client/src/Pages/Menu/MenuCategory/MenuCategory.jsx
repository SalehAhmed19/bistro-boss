import MenuItem from "../../../components/MenuItem/MenuItem";
import SectionCover from "../../../components/SectionCover/SectionCover";
import { Link } from "react-router";

export default function MenuCategory({ menus, title, coverImg }) {
  return (
    <div className="my-10">
      {title && <SectionCover img={coverImg} title={title} />}

      <div className="grid md:grid-cols-2 gap-5 my-5">
        {menus.map((menu) => (
          <MenuItem menu={menu} key={menu._id} />
        ))}
      </div>

      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 block mx-auto uppercase">
          Order your favorite food
        </button>
      </Link>
    </div>
  );
}
