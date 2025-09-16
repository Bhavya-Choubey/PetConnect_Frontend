import React from 'react';
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer({ onNavigate }) {
  const nav = (e, view) => {
    if (e && e.preventDefault) e.preventDefault();
    if (typeof onNavigate === 'function') onNavigate(view);
    else {
      console.warn('Footer: onNavigate not provided, link ignored for view:', view);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-green-500" />
              <span className="text-xl font-semibold text-white">PetConnect</span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting pets with loving families. <br />
              We believe every pet deserves a forever home and <br />
              every family deserves the perfect companion.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800" aria-label="facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800" aria-label="twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800" aria-label="instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800" aria-label="youtube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pl-2 md:pl-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={(e) => nav(e, 'home')} className="hover:text-white transition-colors">Find Pets</a>
              </li>
              <li>
                <a href="#" onClick={(e) => nav(e, 'seller-dashboard')} className="hover:text-white transition-colors">List a Pet</a>
              </li>
              <li>
                <a href="#" onClick={(e) => nav(e, 'about')} className="hover:text-white transition-colors">About PetConnect</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-500" />
                <span>support@petconnect.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-500" />
                <span>+91 999999999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2025 PetConnect. All rights reserved. Made with ❤️ for pets and their families.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
