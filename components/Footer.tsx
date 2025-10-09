import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold text-xl font-bold mb-4">Lisa Properties</h3>
            <p className="text-gray-300 text-sm leading-relaxed">Redefining Real Estate with Purpose and Innovation in Johannesburg South.</p>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Listings', 'About', 'Services', 'Contact'].map(link => (
                <Link key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="block text-gray-300 hover:text-gold transition-colors duration-300">{link}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>📍 Johannesburg South, South Africa</p>
              <p>📧 lisa_properties@outlook.com</p>
              <p>📱 +27 84 012 7473</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.instagram.com/mahlatselisa" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors duration-300">📸</a>
                <a href="https://www.facebook.com/LisaProperties" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors duration-300">📘</a>
                <a href="https://www.lisaproperties.co.za" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold transition-colors duration-300">🌐</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lisa Properties (Pty) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
