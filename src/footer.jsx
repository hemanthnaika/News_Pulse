// src/components/Footer.jsx
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Globe
  } from 'lucide-react';
import { Link } from 'react-router-dom';
  
  export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 mt-5 font-roboto font-bold">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              News<span className="text-blue-500">Pulse</span>
            </h2>
            <p className="text-sm">
              Delivering trusted, real-time news from around the world. Stay informed with the latest headlines and insights.
            </p>
          </div>
  
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Sections</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={'/category/world'} href="#" className="hover:text-blue-400">World</Link></li>
              <li><Link to={'/category/politics'} className="hover:text-blue-400">Politics</Link></li>
              <li><Link
              to={'/category/business'} className="hover:text-blue-400">Business</Link></li>
              <li><Link to={'/category/technology'} className="hover:text-blue-400">Technology</Link></li>
              <li><Link to={'/category/health'} className="hover:text-blue-400">Health</Link></li>
            </ul>
          </div>
  
          {/* Social Icons */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-300"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-green-400"><Globe size={20} /></a>
            </div>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NewsPulse. All rights reserved.
        </div>
      </footer>
    );
  }
  