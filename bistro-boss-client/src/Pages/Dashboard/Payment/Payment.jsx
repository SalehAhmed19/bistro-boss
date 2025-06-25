import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

export default function Payment() {
  // TODO: add publishable key from stripe
  const stripePromise = loadStripe(`${import.meta.env.VITE_stripePkKey}`);
  return (
    <div>
      <SectionTitle title={"Payment"} subtitle={"Pay for your order"} />
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
}
