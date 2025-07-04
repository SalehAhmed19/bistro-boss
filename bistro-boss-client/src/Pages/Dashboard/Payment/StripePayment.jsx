import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import useAuth from "../../../Hooks/useAuth";
const stripePromise = loadStripe(import.meta.env.VITE_stripePkKey);

export default function StripePayment() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [carts] = useCarts();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);
  const foods = carts.map((item) => item.name);
  console.log(totalPrice, foods);
  const cartItems = {
    price: totalPrice,
    foods: foods,
  };

  //   const stripePromise = loadStripe(import.meta.env.VITE_stripePkKey);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    // return fetch("/create-checkout-session", {
    //   method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((data) => data.clientSecret);
    const res = await axiosSecure.post("/create-checkout-session", cartItems);
    return res.data.clientSecret;
  }, [axiosSecure]);

  const options = { fetchClientSecret };

  return (
    <div>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
