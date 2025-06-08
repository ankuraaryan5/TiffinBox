"use client";
import weeklyMenu from "@/app/data/weeklyMenu.json";
import TiffinCard from "@/components/TiffinCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
export default function OrderPage() {
  const today = getToday();
  const todayMenu = weeklyMenu.find((day) => day.day === today);
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Today's Menu - {today}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(todayMenu.meals).map(([mealTime, mealData], idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">
                {mealTime}
              </h3>
              <TiffinCard {...mealData}  showOrderButton={true} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
function getToday() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
}