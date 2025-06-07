"use client"
import { useState } from "react";
import { loadRazorpayScript } from "@/utils/loadRazorpay";


export default function TiffinCard({ title, image, price, description, showOrderButton = false }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOrderClick = () => {
    setShowForm(true); // show form on "Order Now"
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
      handler: function (response) {
        setShowForm(false);
        localStorage.setItem("tiffinUserData", JSON.stringify(formData));
        window.location.href = `/thankyou?orderId=${response.razorpay_payment_id}&amount=${price}`;
      },
      prefill: {
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-green-600 font-semibold mb-4">₹{price}</p>
        {showOrderButton && !showForm && (
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 w-full"
            onClick={handleOrderClick}
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
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
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
              disabled={!formData.name || !formData.address || !formData.contact}
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
// key: "rzp_test_lHnSe52gU23IV8", 