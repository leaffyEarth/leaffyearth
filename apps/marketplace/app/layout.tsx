import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "../styles/theme/ThemeRegistry";
import ThemeProvider from "../components/ThemeProvider";
import { lora, montserrat, belanosima } from "../styles/fonts";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer";

export const metadata: Metadata = {
  title: "LeaffyEarth Plant marketplace",
  description: "Shop Best Quality Plant On LeaffyEarth.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${montserrat.variable} ${belanosima.variable}`}>
      <body>
        <ThemeRegistry>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
