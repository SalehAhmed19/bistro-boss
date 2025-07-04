import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { Link, Outlet } from "react-router-dom";
import SSLCommerce from "./SSLCommerce/SSLCommerce";
import { useState } from "react";
import StripePayment from "./StripePayment";

export default function Payment() {
  // TODO: add publishable key from stripe
  const stripePromise = loadStripe(`${import.meta.env.VITE_stripePkKey}`);
  const [paymentType, setPaymentType] = useState("Stripe");
  const handleSelect = (value) => {
    console.log(value.target.value);
    setPaymentType(value.target.value);
  };
  return (
    <div>
      <SectionTitle title={"Payment"} subtitle={"Pay for your order"} />
      <select
        defaultValue="Stripe"
        onChange={(value) => handleSelect(value)}
        className="select"
      >
        <option disabled={true}>Payment Method</option>
        <option>Stripe</option>
        <option>Stripe Payment</option>
        <option>SSL Commerce</option>
      </select>

      {paymentType === "Stripe" && (
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      )}

      {paymentType === "Stripe Payment" && <StripePayment />}
      {paymentType === "SSL Commerce" && <SSLCommerce />}
    </div>
  );
}
