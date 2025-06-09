"use client";
import { useRouter } from "next/navigation";

export default function SubscriptionPlans() {
  const router = useRouter();

  const plans = [
    {
      title: "Daily",
      price: "as per dish",
      desc: "Perfect for trying it out.",
      link: "/order", 
    },
    {
      title: "Weekly",
      price: "₹3500",
      desc: "Best for regular users.",
      link: "https://rzp.io/rzp/xuLLNXuZ",
    },
    {
      title: "Monthly",
      price: "₹6000",
      desc: "Most value for money!",
      link: "https://rzp.io/rzp/wZAE0BE",
    },
  ];

  return (
    <section className="py-12 bg-yellow-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Subscription Plans</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            onClick={() => window.open(plan.link, "_blank")}
            className="cursor-pointer border rounded-xl p-6 shadow hover:shadow-lg transition-all hover:scale-[1.02] bg-white"
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">{plan.price}</p>
            <p className="text-gray-600">{plan.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
