import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Lisa Properties (Pty) Ltd | Real Estate Johannesburg South',
  description: 'Lisa Properties (Pty) Ltd is a Johannesburg-based real estate company specializing in property sales, rentals, management, and development. Redefining real estate with purpose and innovation.',
  openGraph: {
    title: 'Lisa Properties (Pty) Ltd',
    description: 'Redefining Real Estate with Purpose and Innovation in Johannesburg South.',
    url: 'https://www.lisaproperties.co.za',
    siteName: 'Lisa Properties',
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
