"use client";
// src/app/layout.jsx
import "../styles/globals.css" // Tailwind styles
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// export const metadata = {
//   title: "Tiffin Delivery",
//   description: "Homemade healthy food delivered to your doorstep.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
