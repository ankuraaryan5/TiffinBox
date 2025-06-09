"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      dispatch(
        login({
          name: userData.displayName,
          email: userData.email,
          photo: userData.photoURL,
        })
      );
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("tiffinUser");
      dispatch(logout()); // ✅ update Redux
      console.log("User logged out");
      await router.push("/");
      console.log("Redirected to home page");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="bg-yellow-500 px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/TiffinBox.png" alt="Logo" className="h-10 sm:h-12" />
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            TiffinBox
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/menu" className="text-white hover:underline">
            Menu
          </Link>
          <Link href="/order" className="text-white hover:underline">
            Order
          </Link>
          <Link href="/about" className="text-white hover:underline">
            About
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={toggleMenu} aria-label="User menu">
                <img
                  src={user.photo}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/myOrders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-white p-2 rounded-full hover:shadow-md transition border border-gray-300"
              aria-label="Login with Google"
            >
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google Login"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center space-x-3">
          {user ? (
            <>
              <button onClick={toggleMenu} aria-label="User menu">
                <img
                  src={user.photo}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </button>
            </>
          ) : (
            <>
              {/* Not logged in: Show hamburger */}
              <button
                onClick={toggleMenu}
                className="text-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-500 px-6 pt-4 pb-2 space-y-3">
          <Link href="/" className="block text-white hover:underline">
            Home
          </Link>
          <Link href="/menu" className="block text-white hover:underline">
            Menu
          </Link>
          <Link href="/order" className="block text-white hover:underline">
            Order
          </Link>
          <Link href="/about" className="block text-white hover:underline">
            About
          </Link>
          {user ? (
            <div className="flex flex-col items-start">
              <Link
                href="/myOrders"
                className="block text-white hover:underline"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 text-sm text-white underline hover:text-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gray-100 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google Login"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
