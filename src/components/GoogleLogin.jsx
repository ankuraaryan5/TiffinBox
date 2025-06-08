"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/redux/userSlice"; // ✅ import actions

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser); // ✅ use global user

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      console.log("User Data:", userData);
      localStorage.setItem("tiffinUser", JSON.stringify(userData));
      dispatch(login(userData)); // ✅ update Redux
      alert(`Welcome, ${userData.displayName}`);
    } catch (error) {
      console.error("Login failed", error);
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
