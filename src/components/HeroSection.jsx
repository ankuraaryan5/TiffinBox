// src/components/HeroSection.jsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-yellow-100 text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
        Homemade Tiffins Delivered Daily 🍱
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Healthy, affordable meals from our kitchen to your doorstep.
      </p>
      <Link href="/order">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
          Order Now
        </button>
      </Link>
    </section>
  );
}
