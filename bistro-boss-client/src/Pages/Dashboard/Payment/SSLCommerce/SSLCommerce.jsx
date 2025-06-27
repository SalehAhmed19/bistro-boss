import { FaMoneyBill } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import useCarts from "../../../../Hooks/useCarts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

export default function SSLCommerce() {
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();
  const [carts, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  console.log(user);

  //   const handleCreateSSLCPayment = async () => {};

  const handleCreateSSLCPayment = async (data) => {
    console.log(data); // payment details
    const payment = {
      name: user.displayName,
      email: user.email,
      add1: data.address1,
      add2: data.address2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      phoneNumber: data.phoneNumber,
      price: totalPrice,
      transactionId: "",
      date: new Date(), // utc date convert - use moment js
      cartIds: carts.map((item) => item._id),
      menuIds: carts.map((item) => item.foodId),
      cartItems: carts.map((item) => item.name),
      status: "Pending",
    };

    const res = await axiosSecure.post("/payments/ssl-commerce", payment);
    console.log(res);
    if (res.data.getwayUrl) {
      reset();
      window.location.replace(res.data.getwayUrl);
    }
  };

  return (
    <div className="my-10 p-5 bg-base-200">
      <h2 className="my-5 text-center font-bold text-orange-400 text-2xl">
        Pay Now: <span>৳ {totalPrice}</span>
      </h2>
      <h3 className="font-bold text-xl">Payment Details</h3>
      <p className="text-slate-400">
        Complete your order by providing payment details.
      </p>

      <form className="my-5" onSubmit={handleSubmit(handleCreateSSLCPayment)}>
        <div className="flex gap-5">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={user.displayName}
              {...register("name")}
              readOnly
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={user.email}
              {...register("email")}
              readOnly
            />
          </fieldset>
        </div>

        <div className="divider my-10 text-[#d3d3d4]">Shipping Address</div>

        <div className="flex gap-5">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Adress 1</legend>
            <input
              type="text"
              className="input"
              placeholder="Address 1"
              {...register("address1")}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Adress 2</legend>
            <input
              type="text"
              className="input"
              placeholder="Address 2"
              {...register("address2")}
            />
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">City</legend>
            <input
              type="text"
              className="input"
              placeholder="City"
              {...register("city")}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">State</legend>
            <input
              type="text"
              className="input"
              placeholder="State"
              {...register("state")}
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Postal Code</legend>
            <input
              type="text"
              className="input"
              placeholder="Postal Code (Ex: 5840)"
              {...register("postalCode")}
            />
          </fieldset>
        </div>

        <div className="divider my-10 text-[#d3d3d4]">Contact Details</div>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Phone Number</legend>
          <input
            type="text"
            className="input"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
        </fieldset>
        <button
          onClick={handleCreateSSLCPayment}
          className="btn bg-black text-white w-full my-5"
        >
          <FaMoneyBill /> Pay for Place Order
        </button>
      </form>
    </div>
  );
}
