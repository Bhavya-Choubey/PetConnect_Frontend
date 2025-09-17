import React from 'react';
import { Card } from './ui/card';
import { Shield, Heart, Users } from 'lucide-react';

export default function AboutPetConnect({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-sm text-green-600 hover:underline"
          >
            ← Back
          </button>
        )}

        {/* About Company Card */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">About PetConnect</h3>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Founded in 2025, PetConnect was born from a simple belief:
                  every pet deserves a loving home, and every family deserves
                  the perfect companion. We've created a safe, trusted platform
                  that connects responsible pet owners with caring families.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">
                      Verified users and secure transactions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">
                      Focus on pet welfare and responsible ownership
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">
                      Supportive community of pet lovers
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop"
                  alt="Happy family with pets"
                  className="rounded-xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
