import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'stream-chat-react/dist/css/v2/index.css';
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
    <ClerkProvider>
      <html lang="en">
        <body className="text-white bg-purple antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
