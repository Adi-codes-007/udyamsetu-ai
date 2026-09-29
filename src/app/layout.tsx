import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'UdyamSetu AI | Industrial Approvals & Single Window Orchestration Platform',
  description:
    'One Business Profile. One Approval Roadmap. One Window. Intelligent industrial approvals, compliance guidance and government support for entrepreneurs.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F7FA] text-[#17202A] flex flex-col antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
