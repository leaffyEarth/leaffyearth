"use client";

import React from "react";

export default function AddressSection() {
  return (
    <section className="bg-white rounded-2xl shadow p-8 w-[700px] mt-4">
      <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
      <div className="space-y-4">
        {/* Placeholder for address list */}
        <div className="text-gray-500">No addresses added yet.</div>
      </div>
      <button className="mt-6 bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
        Add New Address
      </button>
    </section>
  );
} 