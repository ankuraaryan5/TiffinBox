"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.user.currentUser);
  // Check if user is logged in
  
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <SubscriptionPlans />
      <Testimonials />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
