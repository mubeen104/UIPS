import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">Unique IP Solutions</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Global leader in IP services, providing expert solutions for buying, selling, and leasing intellectual property assets.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary-400 transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/selling" className="hover:text-primary-400 transition-colors">IP Selling</Link></li>
              <li><Link to="/services/buying" className="hover:text-primary-400 transition-colors">IP Buying</Link></li>
              <li><Link to="/services/leasing" className="hover:text-primary-400 transition-colors">IP Leasing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with the latest IP industry insights.
            </p>
            {subscribed ? (
              <div className="text-green-500 text-sm">Thank you for subscribing!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm">
            <a href="mailto:info@uniqueipsolutions.com" className="flex items-center space-x-2 hover:text-primary-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@uniqueipsolutions.com</span>
            </a>
            <a href="tel:+1234567890" className="flex items-center space-x-2 hover:text-primary-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>+1 (234) 567-890</span>
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Unique IP Solutions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
