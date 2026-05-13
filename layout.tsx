import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Discreet Vault Logistics — Secure. Silent. Delivered.',
  description: 'Premium logistics for high-value cargo and confidential shipments. Discretion at every checkpoint, visibility only for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
