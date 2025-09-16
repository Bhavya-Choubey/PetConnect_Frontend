import React from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, Quote, Users, Award, Heart, Shield } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b884?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "PetConnect helped me find the perfect companion! Luna is now part of our family and brings so much joy. The process was smooth and the seller was very responsive.",
      petName: "Luna (Golden Retriever)"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Austin, TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "As a seller, I was impressed by the quality of potential adopters. The platform helped me find the right family for my kittens. Highly recommend!",
      petName: "3 Maine Coon Kittens"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The verification process gave me confidence in both buyers and sellers. Max is the sweetest rescue dog and I couldn't be happier with my adoption experience.",
      petName: "Max (Rescue Mix)"
    }
  ];

  const stats = [
    {
      icon: Heart,
      value: "50,000+",
      label: "Happy Adoptions",
      color: "text-red-500"
    },
    {
      icon: Users,
      value: "25,000+",
      label: "Active Members",
      color: "text-blue-500"
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "User Rating",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Verified Users",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of pet lovers who have found their perfect companions through PetConnect
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="h-6 w-6 text-green-500 opacity-50 mb-2" />
                <p className="text-gray-700 mb-3 leading-relaxed">{testimonial.text}</p>
                <p className="text-sm font-medium text-green-600">
                  Adopted: {testimonial.petName}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Company Card */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-lg border-0 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">About PetConnect</h3>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Founded in 2025, PetConnect was born from a simple belief: every pet deserves a loving home, 
                  and every family deserves the perfect companion. We've created a safe, trusted platform that 
                  connects responsible pet owners with caring families.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">Verified users and secure transactions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">Focus on pet welfare and responsible ownership</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-200" />
                    <span className="text-green-50">Supportive community of pet lovers</span>
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
    </section>
  );
}
