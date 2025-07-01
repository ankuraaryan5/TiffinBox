"use client";
import { useEffect, useState } from "react";
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function TiffinCard({
  title,
  description,
  price,
  image,
  showOrderButton,
  isPastCutoff,
  cutoffTime,
}) {
  const user = useSelector((state) => state.user.currentUser);
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });
  useEffect(() => {
    if (!cutoffTime || !showOrderButton) return;
    const interval = setInterval(() => {
      const now = new Date();
      const cutoff = new Date(cutoffTime);
      const diff = cutoff - now;
      if (diff <= 0) {
        setTimeLeft("Ordering closed");
        clearInterval(interval);
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hrs}h ${mins}m ${secs}s left to order`);
    }, 1000);
    return () => clearInterval(interval);
  }, [cutoffTime, showOrderButton]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOrderClick = () => {
    if (user === null) {
      alert("Please login to place an order.");
      return;
    }
    setShowForm(true);
  };
  const handleOrder = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: price * 100,
      currency: "INR",
      name: "Tiffin Service",
      description: `Order for ${title}`,
      image: "/logo.png",
      handler: async function (response) {
        try {
          await addDoc(collection(db, "orders"), {
            userEmail: user.email,
            mealTitle: title,
            amount: price,
            paymentId: response.razorpay_payment_id,
            orderDetails: formData,
            createdAt: serverTimestamp(),
          });
          setShowForm(false);
          localStorage.setItem("tiffinUserData", JSON.stringify(formData));
          window.location.href = `/thankyou?orderId=${response.razorpay_payment_id}&amount=${price}`;
        } catch (error) {
          console.error("Error adding order:", error);
        }
      },
      prefill: {
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
        email: user.email,
      },
      notes: {
        meal: title,
      },
      theme: {
        color: "#22c55e",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div
      className={`rounded-md shadow p-4 bg-white transition-opacity duration-300 relative ${
        isPastCutoff ? "opacity-50 " : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-green-600 font-semibold mb-4">₹{price}</p>
        {!isPastCutoff && timeLeft && (
          <p className="text-sm text-gray-500 mb-2 italic">{timeLeft}</p>
        )}
        {isPastCutoff && (
          <p className="text-red-600 font-medium mb-2">
            Ordering closed at{" "}
            {new Date(cutoffTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        {showOrderButton && !showForm && (
          <button
            onClick={handleOrderClick}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full cursor-pointer"
          >
            Order Now
          </button>
        )}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4">
                Ordering For {user.email}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded"
              />
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              />
              <button
                onClick={handleOrder}
                disabled={
                  !formData.name || !formData.address || !formData.contact
                }
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
