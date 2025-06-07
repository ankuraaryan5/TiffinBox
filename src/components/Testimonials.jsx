export default function Testimonials() {
  const reviews = [
    {
      name: "Riya S.",
      comment: "Tastes just like homemade food! Always on time.",
    },
    {
      name: "Ankit M.",
      comment: "Affordable and delicious. Highly recommended!",
    },
  ];

  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Customer Testimonials</h2>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 px-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white shadow p-6 rounded-xl">
            <p className="italic">"{r.comment}"</p>
            <p className="mt-4 font-semibold">- {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
