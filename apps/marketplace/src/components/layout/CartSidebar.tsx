import React from "react";
import { useCart } from "@/hooks/useCart";

export function CartSidebar() {
  const { isSidebarOpen, closeSidebar, items, total, removeItem, updateQuantity } = useCart();

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeSidebar}
        aria-label="Close cart"
      />
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-lg p-6 overflow-y-auto flex flex-col">
        <button className="absolute top-4 right-4 text-2xl" onClick={closeSidebar}>✕</button>
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className="flex-1">
            {items.map((item) => (
              <div key={item.id} className="mb-4 border-b pb-4 flex items-center">
                <img src={item.plant.imageUrl} alt={item.plant.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <div className="font-semibold">{item.plant.name}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity} | Size: {item.plant.size}
                  </div>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500">Remove</button>
                  </div>
                </div>
                <div className="ml-4 font-bold">₹{item.plant.price * item.quantity}</div>
              </div>
            ))}
          </div>
        )}
        {/* Checkout button */}
        <button className="w-full bg-green-600 text-white py-3 rounded mt-6 font-bold text-lg">
          CHECKOUT - ₹{total}
        </button>
      </aside>
    </>
  );
} 