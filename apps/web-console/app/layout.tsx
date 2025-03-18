// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/store/Provider'; // Adjust path as needed
import ThemeRegistry from '@/ThemeRegistry';
import GlobalSnackbar from '@/components/SnackBar/alert';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LeaffyEarth | Admin',
  description: 'LeaffyEarth central admin console',
  icons: {
    icon: '/leaffyFavicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/leaffyFavicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeRegistry>
            {children}
            <GlobalSnackbar />
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
