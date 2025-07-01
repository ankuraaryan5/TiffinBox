"use client";
import weeklyMenu from "@/app/data/weeklyMenu.json";
import TiffinCard from "@/components/TiffinCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
          {Object.entries(todayMenu.meals).map(([mealTime, mealData], idx) => {
            const { isAllowed, cutoffTime } = checkOrderingTime(mealTime);
            return (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">
                  {mealTime}
                </h3>
                <TiffinCard
                  {...mealData}
                  showOrderButton={isAllowed}
                  isPastCutoff={!isAllowed}
                  cutoffTime={cutoffTime}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
function getToday() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
}
function checkOrderingTime(mealTime) {
  const now = new Date();
  let cutoff;

  switch (mealTime.toLowerCase()) {
    case "breakfast":
      cutoff = new Date();
      cutoff.setHours(7, 0, 0, 0);
      break;
    case "lunch":
      cutoff = new Date();
      cutoff.setHours(12, 30, 0, 0);
      break;
    case "dinner":
      cutoff = new Date();
      cutoff.setHours(18, 30, 0, 0);
      break;
    default:
      return { isAllowed: false, cutoffTime: null };
  }

  return {
    isAllowed: now < cutoff,
    cutoffTime: cutoff.toISOString(),
  };
}

