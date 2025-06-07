"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import OurMission from "@/components/OurMission";
import OurStory from "@/components/OurStory";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-2 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-yellow-600 text-center">
          About Us
        </h1>

        <p className="text-lg mb-6 leading-relaxed text-justify">
          At <span className="font-semibold">TiffinBox</span>, we believe that
          good food brings happiness and health. We are a dedicated tiffin
          delivery service that provides home-cooked, nutritious, and
          delicious meals to working professionals, students, and anyone who
          misses the taste of real Indian ghar-ka-khana.
        </p>

        <p className="text-lg mb-6 leading-relaxed text-justify">
          Whether you're away from home, a busy professional, or just looking
          for a healthy alternative to restaurant food, we’ve got you covered.
          Our meals are prepared with fresh ingredients every day and delivered
          hot right to your doorstep.
        </p>

        <p className="text-lg leading-relaxed text-justify">
          With weekly subscription plans, day-wise menus, and flexible delivery
          options, we aim to make your meal experience convenient and
          satisfying. Our goal is to bring the comfort of homemade meals into
          your everyday routine.
        </p>
      </section>
        <OurMission />
        <OurStory   />
        <Footer />
    </>
  );
}