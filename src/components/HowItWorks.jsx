export default function HowItWorks() {
  const steps = [
    { title: "Choose a Plan", description: "Pick a daily, weekly, or monthly plan." },
    { title: "Select Meals", description: "Customize your daily menu preferences." },
    { title: "Enjoy Delivery", description: "Get fresh, home-style food delivered to you." },
  ];

  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-white shadow p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
