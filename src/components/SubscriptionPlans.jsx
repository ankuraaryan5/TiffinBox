"use client";
import { useSelector } from "react-redux";
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SubscriptionCard() {
  const user = useSelector((state) => state.user.currentUser);
  const subscriptionPlans = [
  {
    name: "Daily",
    days: 1,
    price: 200,
  },
  {
    name: "Weekly",
    days: 7,
    price: 1200,
  },
  {
    name: "Monthly",
    days: 30,
    price: 4500,
  },
];
  const handleSubscribe = async (plan) => {
    if (!user) {
      alert("Please login to subscribe.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: plan.price * 100,
      currency: "INR",
      name: "Tiffin Subscription",
      description: `${plan.name} Plan`,
      handler: async function (response) {
        const start = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        const end = new Date(start.getTime() + plan.days * 24 * 60 * 60 * 1000);

        await addDoc(collection(db, "subscriptions"), {
          userEmail: user.email,
          plan: plan.name,
          days: plan.days,
          amount: plan.price,
          startDate: start,
          endDate: end,
          isActive: true,
          paymentId: response.razorpay_payment_id,
          createdAt: serverTimestamp(),
        });
        localStorage.setItem("subscription", JSON.stringify({ plan: plan.name }));
        window.location.href = `/thankyou?subscription=${plan.name}`;
      },
      prefill: {
        name: user.name || "",
        email: user.email,
      },
      theme: {
        color: "#22c55e",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-10 px-4">
      {subscriptionPlans.map((plan, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-6 shadow hover:shadow-lg transition duration-300 bg-white"
        >
          <h3 className="text-xl font-bold mb-2 text-green-700">{plan.name} Plan</h3>
          <p className="text-gray-600 mb-1">{plan.days} day(s)</p>
          <p className="font-semibold text-green-600 mb-4">₹{plan.price}</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            onClick={() => handleSubscribe(plan)}
          >
            Subscribe Now
          </button>
        </div>
      ))}
    </div>
  );
}
