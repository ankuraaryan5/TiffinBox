"use client";
import TiffinCard from "@/components/TiffinCard";
import Navbar from "@/components/Navbar";
import weeklyMenu from "@/app/data/weeklyMenu.json"; // Adjust the path as necessary
import Footer from "@/components/Footer";

export default function Menu() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
          Weekly Menu
        </h1>

        {weeklyMenu.map((dayItem, dayIndex) => (
          <div key={dayIndex} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {dayItem.day}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(dayItem.meals).map(
                ([mealTime, mealData], mealIndex) => (
                  <div key={mealIndex}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">
                      {mealTime}
                    </h3>
                    <TiffinCard {...mealData} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    <Footer />  
    </>
  );
}
