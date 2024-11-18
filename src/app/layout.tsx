import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Slack clone',
  description: 'A Slack clone built with Next.js and Stream Chat.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white bg-purple antialiased">{children}</body>
    </html>
  );
}
