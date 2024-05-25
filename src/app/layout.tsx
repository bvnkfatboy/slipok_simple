import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';

import './globals.css';

const kanit = Kanit({
  subsets: ['thai'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'เช็คสลิป | Check Slip',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
