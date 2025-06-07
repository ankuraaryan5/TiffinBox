// src/components/Navbar.jsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-yellow-500 px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <img src="/TiffinBox.png" alt="Logo" className="h-12" />
        <Link href="/" className="text-2xl font-bold text-white">TiffinBox</Link>

        </div>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:underline">Home</Link>
          <Link href="/menu" className="text-white hover:underline">Menu</Link>
          <Link href="/order" className="text-white hover:underline">Order</Link>
          <Link href="/about" className="text-white hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}
