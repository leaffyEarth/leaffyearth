"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import { User as LucideUser, MapPin, ShoppingBag, Eye, Gift, LogOut, KeyRound, Users, DollarSign, Edit2 } from "lucide-react";
import { IGetUserResponse } from "@/types/user";
import ProfileSection from "@/app/account/sections/ProfileSection";
import AddressSection from "@/app/account/sections/AddressSection";
import OrdersSection from "@/app/account/sections/OrdersSection";

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

interface AccountSectionsProps {
  initialUserData: IGetUserResponse;
}

export default function AccountSections({ initialUserData }: AccountSectionsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("My Profile");
  const [userData, setUserData] = useState(initialUserData);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/account/login");
  };

  return (
    <div className="min-h-screen bg-[#fcfcf7] flex">
      {/* Sidebar */}
      <aside className="w-[320px] bg-green-900 text-white rounded-2xl m-8 flex flex-col py-8 px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-800 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mb-2">
            {userData.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="font-semibold text-lg">{userData.name}</div>
          <div className="text-xs text-green-200 mt-1">{userData.email}</div>
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
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start mt-12">
        {activeTab === "My Profile" && (
          <ProfileSection userData={userData} onUpdate={setUserData} />
        )}

        {activeTab === "Delivery Address" && (
          <AddressSection />
        )}

        {activeTab === "My Orders" && (
          <OrdersSection />
        )}
      </main>
    </div>
  );
} 