"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import { User as LucideUser, MapPin, ShoppingBag, Eye, Gift, LogOut, KeyRound, Users, DollarSign, Edit2 } from "lucide-react";
import { useAuth } from '@/context/AuthContext';

const sidebarLinks = [
  { label: "My Profile", icon: LucideUser },
  { label: "Delivery Address", icon: MapPin },
  { label: "My Orders", icon: ShoppingBag },
  { label: "Recently Viewed", icon: Eye },
  { label: "Loyalty Points", icon: DollarSign },
  { label: "How To Earn", icon: Gift },
  { label: "How To Spend", icon: Gift },
  { label: "Refer Friend", icon: Users },
  { label: "Change Password", icon: KeyRound },
];

export default function AccountPage() {
  const { user, idToken, loading, error } = useAuth();
  const router = useRouter();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
  }, [user, loading]);

  const [activeTab, setActiveTab] = useState("My Profile");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    birthdate: "",
    gender: "",
  });

  // When user changes, update the profile state
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        contact: "",
        birthdate: "",
        gender: "",
      });
    }
  }, [user]);

  // Dummy orders and addresses
  const orders = [];
  const addresses = [];

  return (
    <div className="min-h-screen bg-[#fcfcf7] flex">
      {/* Sidebar */}
      <aside className="w-[320px] bg-green-900 text-white rounded-2xl m-8 flex flex-col py-8 px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-800 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-2">
            {profile.firstName?.[0] || ""}{profile.lastName?.[0] || ""}
          </div>
          <div className="font-semibold text-lg">{profile.firstName} {profile.lastName}</div>
          <div className="text-xs text-green-200 mt-1">{profile.email}</div>
        </div>
        <nav className="flex-1">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              className={`flex items-center w-full px-3 py-2 rounded-lg mb-1 text-left hover:bg-green-800 ${activeTab === link.label ? "bg-green-800" : ""}`}
              onClick={() => setActiveTab(link.label)}
            >
              <link.icon className="w-5 h-5 mr-3" />
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
        <button
          className="flex items-center mt-8 px-3 py-2 rounded-lg hover:bg-green-800"
          onClick={async () => {
            await signOut(auth);
            router.replace("/account/login");
          }}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start mt-12">
        {activeTab === "My Profile" && (
          <section className="bg-white rounded-2xl shadow p-8 w-[700px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Good Afternoon! {profile.firstName}</h2>
              <button className="p-2 rounded hover:bg-gray-100">
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <form className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">First Name</label>
                <input className="w-full bg-gray-100 rounded px-3 py-2" value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name</label>
                <input className="w-full bg-gray-100 rounded px-3 py-2" value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input className="w-full bg-gray-100 rounded px-3 py-2" value={profile.email} disabled />
              </div>
              <div>
                <label className="block text-sm mb-1">Contact Number</label>
                <input className="w-full bg-gray-100 rounded px-3 py-2" value={profile.contact} onChange={e => setProfile(p => ({ ...p, contact: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Birthdate</label>
                <input className="w-full bg-gray-100 rounded px-3 py-2" placeholder="DD/MM/YYYY" value={profile.birthdate} onChange={e => setProfile(p => ({ ...p, birthdate: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Gender</label>
                <div className="flex gap-4 mt-2">
                  {["Male", "Female", "Other"].map(g => (
                    <label key={g} className="flex items-center gap-1">
                      <input type="radio" name="gender" value={g} checked={profile.gender === g} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))} />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </form>
            <button className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">Save Changes</button>
          </section>
        )}

        {activeTab === "Delivery Address" && (
          <section className="bg-white rounded-2xl shadow p-8 w-[700px] mt-4">
            <h2 className="text-xl font-bold mb-4">Your Addresses</h2>
            {/* List addresses here */}
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">Add New Address</button>
          </section>
        )}

        {activeTab === "My Orders" && (
          <section className="bg-white rounded-2xl shadow p-8 w-[700px] mt-4">
            <h2 className="text-xl font-bold mb-4">Your Orders</h2>
            {/* List orders here */}
            <div>No orders yet.</div>
          </section>
        )}
      </main>
    </div>
  );
}
