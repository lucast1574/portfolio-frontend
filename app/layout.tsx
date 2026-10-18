import type { Metadata, Viewport } from 'next';
import './globals.css';
import './portfolio-motion.css';
import { detectLocale } from '@/lib/locale';

export const metadata: Metadata = {
 title: 'Lucas Santillan',
 metadataBase: new URL('https://lucas.santillan.pro'),
 verification: { google: '-waQoOzk8ybo0FoBf71Thfw9WLp6WfIWOdgECWaL0nI' },
 robots: {index:false,follow:false},
 icons: {icon:[{url:'/favicon.svg',type:'image/svg+xml'}],shortcut:'/favicon.svg'},
 formatDetection: { telephone:false,email:false,address:false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080c12',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = detectLocale();
  return (
    <html lang={locale}>
      <body>
        <div className="stars" />
        <div className="stars-2" />
        <div className="stars-3" />
        {children}
      </body>
    </html>
  );
}
