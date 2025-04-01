// app/dashboard/page.tsx (example)
"use client";

import React from "react";
import { Button } from "@mui/material";
import { useThemeToggle } from "@/ThemeContext";

export default function DashboardPage() {
  const { mode, toggleTheme } = useThemeToggle();

  return <></>;
}
