import MenuItem from "../../../components/MenuItem/MenuItem";
import SectionCover from "../../../components/SectionCover/SectionCover";

export default function MenuCategory({ menus, title, coverImg }) {
  return (
    <div className="my-5">
      {title && <SectionCover img={coverImg} title={title} />}

      <div className="grid md:grid-cols-2 gap-5 my-16">
        {menus.map((menu) => (
          <MenuItem menu={menu} key={menu._id} />
        ))}
      </div>
    </div>
  );
}
