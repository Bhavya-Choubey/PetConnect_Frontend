import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { PawPrint, Heart, Users, Shield } from 'lucide-react';

export default function Landing({ onGetStarted }) {
  const features = [
    {
      icon: <Heart className="w-6 h-6 text-green-500" />,
      title: "Find Your Perfect Match",
      description: "Discover loving pets waiting for their forever homes."
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Connect with Care", 
      description: "Easily connect with pet owners to find your perfect match."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Safe & Secure",
      description: "All listings are verified for your peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 py-16 flex flex-col">

      {/* Hero Section */}
      <div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full"
        style={{ paddingTop: "0px", paddingBottom: "30px" }}
      >
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                <PawPrint className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-800">PetConnect</h1>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Next
            <span className="block text-green-500">
              Fur-ever Friend
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with loving pets in need of homes. Whether you're looking to adopt 
            or rehome - we're here to make it happen.
          </p>

          {/* CTA Button (moved slightly lower with mt-12) */}
          <div className="mt-12">
            <Button 
              onClick={onGetStarted}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let's Get Started
            </Button>
          </div>
          <br></br>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 mt-auto mb-8 md:mb-12 lg:mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 text-center border-0 shadow-lg bg-white rounded-2xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

