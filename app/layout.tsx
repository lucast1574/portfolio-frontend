import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lucas Santillan — Portfolio',
  description: 'Full Stack Developer · Projects, experiments and ventures.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Lucas Santillan — Portfolio',
    description: 'Full Stack Developer · Projects, experiments and ventures.',
    url: 'https://lucas.santillan.pro',
    siteName: 'Lucas Santillan',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="stars" />
        <div className="stars-2" />
        <div className="stars-3" />
        {children}
      </body>
    </html>
  );
}
