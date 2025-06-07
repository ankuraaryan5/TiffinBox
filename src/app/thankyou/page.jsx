"use client";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [userData, setUserData] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("orderId") || "N/A");
    setAmount(params.get("amount") || "0");

    const stored = localStorage.getItem("tiffinUserData");
    if (stored) {
      setUserData(JSON.parse(stored));
      localStorage.removeItem("tiffinUserData"); // optional
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmR1Mm5rd3o0dGVmbjJxY2RzdWVtdGZrejhuYTFmbGpoam9zZHdrdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L0O3TQpp0WnSXmxV8p/giphy.gif"
          alt="Success"
          className="mx-auto w-24 h-24 mb-6"
        />
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Thank You for Your Order! 🎉 {userData?.name}
        </h1>
        <p className="text-gray-700 text-lg mb-2">
          Your order has been <span className="font-medium">successfully placed</span>.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 my-6 text-left text-sm">
          <p className="mb-1">
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="text-gray-800">{orderId}</span>
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span>{" "}
            <span className="text-green-700 font-bold">₹{amount}</span>
          </p>
        </div>
        <p className="text-gray-600 mb-6">
          We’ll contact you shortly to confirm your order. Thank you for choosing our service!
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
