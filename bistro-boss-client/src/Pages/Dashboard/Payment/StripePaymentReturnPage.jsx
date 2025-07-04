import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function StripePaymentReturnPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(
        `http://localhost:4000/api/checkout-session?sessionId=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "complete") {
            setStatus("complete");
            setCustomerEmail(data.customer_email);
            console.log("Payment successful! Session Data:", data);
          }
        });
    }
  }, [location.search]);
  if (status === "complete") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-800 p-6">
        <svg
          className="w-24 h-24 text-green-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-2">Thank you for your purchase.</p>
        {customerEmail && (
          <p className="text-md">A receipt has been sent to {customerEmail}.</p>
        )}
        <button
          onClick={() => (window.location.href = "/")} // Redirect to home or order history
          className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    );
  }
}
