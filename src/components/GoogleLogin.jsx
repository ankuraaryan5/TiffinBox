"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useState } from "react";

export default function GoogleLogin() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      console.log("User Data:", userData);
      setUser(userData);
      localStorage.setItem("tiffinUser", JSON.stringify(userData));
      alert(`Welcome, ${userData.displayName}`);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("tiffinUser");
  };

  return (
    <div className="text-center my-4">
      {user ? (
        <>
          <p className="mb-2">Logged in as {user.displayName}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
