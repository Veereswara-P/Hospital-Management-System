import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sri Lalitha Multi Speciality Hospital',
  description: 'Comprehensive healthcare services for Narsipatnam and surrounding areas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}