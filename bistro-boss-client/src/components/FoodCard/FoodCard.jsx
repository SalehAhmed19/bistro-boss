export default function FoodCard({ item }) {
  const { name, image, price, recipe } = item;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-5 pt-5">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <p className="bg-black text-orange-400 absolute right-0 mr-2 mt-2 p-2 rounded-md">
        $ {price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>

        <div className="card-actions">
          <button className="btn btn-outline border-0 border-b-4 border-orange-400">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
