"use client";

import React from "react";
import { Button } from "@mui/material";
import { useThemeToggle } from "@/ThemeContext";

export default function AuthLoadingPage() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ fontSize: "24px", marginBottom: "20px" }}>Auth Loading</div>
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid #ccc",
          borderTop: "5px solid #000",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
