import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

export default function AddItems() {
  const image_hosting_api_key = import.meta.env.VITE_imgbbApiKey;
  const image_hosting_api = `${
    import.meta.env.VITE_imgbbHostingApi
  }?key=${image_hosting_api_key}`;

  // // console.log(image_hosting_api);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    // console.log(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile.image);
    // upload image and get url
    const res = await axiosPublic.post(image_hosting_api, formData);
    // // console.log(data);

    // // console.log(res.data);

    if (res) {
      // Now send data to the server
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.url,
        category: data.category,
        price: parseFloat(data.price),
      };

      // console.log(menuItem);
      const menuRes = await axiosSecure.post("/upload/menu", menuItem);

      if (menuRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} item added successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // console.log(menuRes.data);

      // if (menuRes.data.insertedId) {

      // }

      // console.log(menuItem);
    }

    reset();
  };

  return (
    <div>
      <SectionTitle title={"Add Items"} subtitle={"Admin Panel"} />

      <div className="px-20 py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-base-200 p-8">
          {/* Form */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Recipe Names<span className="text-red-500">*</span>
            </legend>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input w-full"
              placeholder="Enter recipe name"
            />
          </fieldset>

          <div className="flex gap-5 w-full">
            {/* Category */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Category<span className="text-red-500">*</span>
              </legend>
              <select
                {...register("category", { required: true })}
                defaultValue="salad"
                className="select w-full"
              >
                <option disabled={true}>Category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </fieldset>

            {/* Price */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">
                Price<span className="text-red-500">*</span>
              </legend>
              <input
                {...register("price", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Price $"
              />
            </fieldset>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Recipe Details<span className="text-red-500">*</span>
            </legend>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea h-36 w-full"
              placeholder="Enter Recipe Details"
            ></textarea>
          </fieldset>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-ghost my-5"
          />

          <button className="btn flex bg-[#D1A054] text-white">
            {" "}
            <FaUtensils /> Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
