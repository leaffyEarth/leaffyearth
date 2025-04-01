// src/styles/ThemeRegistry.tsx
"use client";

import React from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "./createEmotionCache";
import { ThemeContextProvider } from "./ThemeContext";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [emotionCache] = React.useState<EmotionCache>(() =>
    createEmotionCache(),
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContextProvider>
        {/* CssBaseline sets up some basic MUI defaults */}
        <CssBaseline />
        {children}
      </ThemeContextProvider>
    </CacheProvider>
  );
}
