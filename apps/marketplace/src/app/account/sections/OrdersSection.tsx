"use client";

import React from "react";

export default function OrdersSection() {
  return (
    <section className="bg-white rounded-2xl shadow p-8 w-[700px] mt-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      <div className="space-y-4">
        {/* Placeholder for orders list */}
        <div className="text-gray-500">No orders yet.</div>
      </div>
    </section>
  );
} 