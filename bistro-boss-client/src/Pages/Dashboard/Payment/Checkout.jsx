import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCarts from "../../../Hooks/useCarts";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [carts, refetch] = useCarts();
  const axiosSecure = useAxiosSecure();
  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent/stripe", {
          price: totalPrice,
        })
        .then((res) => {
          console.log(res.data);
          // console.log({ clientSecret: res.data.clientSecret });
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.error("Error from stripe: ", error);
      setError(error.message);
    } else {
      console.log("Payment method created: ", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Annonymous",
            name: user?.displayName || "Annonymous",
          },
        },
      });
    if (cardConfirmError) {
      console.error({ cardConfirmError });
    } else {
      console.log({ paymentIntent });
      if (paymentIntent.status === "succeeded") {
        console.log({ transactionId: paymentIntent.id });
        // setTransactionId(paymentIntent.id);

        // now save the payment in the db
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert - use moment js
          cartIds: carts.map((item) => item._id),
          menuIds: carts.map((item) => item.foodId),
          cartItems: carts.map((item) => item.name),
          status: "Pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log({ paymentSaved: res });
        if (res) {
          refetch();
          Swal.fire({
            title: "Payment Successfull!",
            html: `<p><span style="font-weight: bold; color: #A5DC86">Transaction ID:</span> <br><span style="color: #FF6900">${paymentIntent.id}</span></p>`,
            icon: "success",
          });
          navigate("/dashboard/orders");
        }
      }
    }
  };

  return (
    <div className="my-5 bg-base-200 p-5 rounded-md">
      <h2 className="text-center font-bold my-5">
        Pay on Stripe UDS:{" "}
        <span className="text-orange-500">{totalPrice} $</span>
      </h2>
      <form onSubmit={handlePaymentSubmit}>
        {clientSecret && (
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        )}
        <button
          className="btn btn-sm bg-black text-white my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
}
