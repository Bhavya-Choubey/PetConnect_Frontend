import React from 'react';
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-green-500" />
              <span className="text-xl font-semibold text-white">PetConnect</span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting pets with loving families. We believe every pet deserves a forever home 
              and every family deserves the perfect companion.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Find Pets</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">List a Pet</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Pet Care Tips</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Success Stories</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">About PetConnect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Our Mission</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Safety Guidelines</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
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
                <span>1-800-PET-LOVE</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>123 Pet Street, Animal City, AC 12345</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm mb-2">Stay updated with pet news!</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white px-4">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 PetConnect. All rights reserved. Made with ❤️ for pets and their families.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
              <a href="#" className="hover:text-white transition-colors">Report Issue</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
