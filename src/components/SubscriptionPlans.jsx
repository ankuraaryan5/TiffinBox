export default function SubscriptionPlans() {
  const plans = [
    { title: "Daily", price: "as per dish", desc: "Perfect for trying it out." },
    { title: "Weekly", price: "₹3500", desc: "Best for regular users." },
    { title: "Monthly", price: "₹5000", desc: "Most value for money!" },
  ];

  return (
    <section className="py-12 bg-yellow-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Subscription Plans</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan, i) => (
          <div key={i} className="border rounded-xl p-6 shadow">
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">{plan.price}</p>
            <p className="text-gray-600">{plan.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
