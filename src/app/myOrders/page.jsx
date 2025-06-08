"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyOrders() {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <p className="text-red-500 text-lg font-medium">
              Please log in to view your orders.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">Loading your orders...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">
              No orders found.
            </p>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-transform transform hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {order.mealTitle}
                    </h2>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      ₹{order.amount}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-medium text-gray-600">
                        Order ID:
                      </span>{" "}
                      {order.paymentId}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      {order.orderDetails?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Contact:
                      </span>{" "}
                      {order.orderDetails?.contact}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Address:
                      </span>{" "}
                      {order.orderDetails?.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
