// src/app/layout.jsx
import "../styles/globals.css" // Tailwind styles

export const metadata = {
  title: "Tiffin Delivery",
  description: "Homemade healthy food delivered to your doorstep.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 font-sans">
        {children}
      </body>
    </html>
  );
}
