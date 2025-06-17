"use client";

import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import { IGetUserResponse } from "@/types/user";
import { userApi } from "@/lib/api/userApi";

interface ProfileSectionProps {
  userData: IGetUserResponse;
  onUpdate: (data: IGetUserResponse) => void;
}

export default function ProfileSection({ userData, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: userData.name.split(" ")[0] || "",
    lastName: userData.name.split(" ")[1] || "",
    email: userData.email,
    contact: "",
    birthdate: userData.dob,
    gender: userData.gender,
  });

  const handleSave = async () => {
    try {
      const updatedUser = await userApi.createUser({
        uid: userData.uid,
        email: userData.email,
        name: `${profile.firstName} ${profile.lastName}`,
        role: userData.role,
        dob: profile.birthdate,
        gender: profile.gender,
      });
      onUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow p-8 w-[700px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Good Afternoon! {profile.firstName}</h2>
        <button 
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
      <form className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input 
            className="w-full bg-gray-100 rounded px-3 py-2" 
            value={profile.firstName} 
            onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input 
            className="w-full bg-gray-100 rounded px-3 py-2" 
            value={profile.lastName} 
            onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input 
            className="w-full bg-gray-100 rounded px-3 py-2" 
            value={profile.email} 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Number</label>
          <input 
            className="w-full bg-gray-100 rounded px-3 py-2" 
            value={profile.contact} 
            onChange={e => setProfile(p => ({ ...p, contact: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Birthdate</label>
          <input 
            className="w-full bg-gray-100 rounded px-3 py-2" 
            placeholder="DD/MM/YYYY" 
            value={profile.birthdate} 
            onChange={e => setProfile(p => ({ ...p, birthdate: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Gender</label>
          <div className="flex gap-4 mt-2">
            {["Male", "Female", "Other"].map(g => (
              <label key={g} className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="gender" 
                  value={g} 
                  checked={profile.gender === g} 
                  onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}
                  disabled={!isEditing}
                />
                {g}
              </label>
            ))}
          </div>
        </div>
      </form>
      {isEditing && (
        <button 
          className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          onClick={handleSave}
        >
          Save Changes
        </button>
      )}
    </section>
  );
} 