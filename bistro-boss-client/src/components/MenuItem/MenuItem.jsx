export default function MenuItem({ menu }) {
  const { name, image, price, recipe } = menu;
  return (
    <div className="flex items-center gap-3 my-5">
      <img
        src={image}
        alt=""
        className="w-[80px] h-[70px] border-2 border-gray-200"
        style={{ borderRadius: "0 200px 200px 200px" }}
      />
      <div>
        <h3 className="uppercase">{name} ------</h3>
        <p>{recipe}</p>
      </div>
      <p className="text-orange-400">$ {price}</p>
    </div>
  );
}
