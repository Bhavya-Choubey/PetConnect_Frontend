import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Shield, FileText, Mail, Phone, Star } from 'lucide-react';
import AdoptionRequestModal from './AdoptionRequestModal';

// Mock pet data
const mockPetData = {
  '1': {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1754499265662-a1b9367c95f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29sZGVuJTIwcmV0cmlldmVyJTIwZG9nfGVufDF8fHx8MTc1NzQxNDk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1754499265662-a1b9367c95f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29sZGVuJTIwcmV0cmlldmVyJTIwZG9nfGVufDF8fHx8MTc1NzQxNDk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop'
    ],
    location: 'New York, NY',
    vaccinated: true,
    registered: true,
    description: 'Buddy is a friendly and energetic Golden Retriever who loves playing fetch and going on long walks. He\'s great with kids and other dogs. House trained and knows basic commands like sit, stay, and come. He enjoys swimming and is perfect for an active family.',
    seller: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.8,
      totalReviews: 23,
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      joinedDate: 'Member since 2022'
    }
  },
  '2': {
    id: '2',
    name: 'Whiskers',
    breed: 'Tabby Cat',
    age: '6 months',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1631432903354-0c818078e35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBraXR0ZW58ZW58MXx8fHwxNzU3NDk2ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1631432903354-0c818078e35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBraXR0ZW58ZW58MXx8fHwxNzU3NDk2ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop'
    ],
    location: 'Los Angeles, CA',
    vaccinated: true,
    registered: false,
    description: 'Whiskers is a playful and affectionate tabby kitten who loves to chase toys and curl up for naps. She\'s litter trained and gets along well with other cats. Perfect for a family looking for a loving companion.',
    seller: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.9,
      totalReviews: 31,
      email: 'mike.chen@email.com',
      phone: '+1 (555) 987-6543',
      joinedDate: 'Member since 2021'
    }
  },
  '3': {
    id: '3',
    name: 'Max',
    breed: 'Beagle',
    age: '3 months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1685629334233-81d6d567e6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmVhZ2xlJTIwcHVwcHl8ZW58MXx8fHwxNzU3NDk2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1685629334233-81d6d567e6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmVhZ2xlJTIwcHVwcHl8ZW58MXx8fHwxNzU3NDk2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'
    ],
    location: 'Chicago, IL',
    vaccinated: false,
    registered: true,
    description: 'Max is an adorable Beagle puppy full of energy and curiosity. He loves to explore and play with toys. Still learning basic training but very smart and eager to please. Vaccinations in progress.',
    seller: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.7,
      totalReviews: 18,
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      joinedDate: 'Member since 2023'
    }
  },
  '4': {
    id: '4',
    name: 'Princess',
    breed: 'Persian Cat',
    age: '1.5 months',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1714696217563-7e89bb7bf631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHdoaXRlfGVufDF8fHx8MTc1NzQ5NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1714696217563-7e89bb7bf631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHdoaXRlfGVufDF8fHx8MTc1NzQ5NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=400&fit=crop'
    ],
    location: 'Miami, FL',
    vaccinated: true,
    registered: true,
    description: 'Princess is a beautiful Persian cat with a calm and gentle personality. She loves to be pampered and enjoys quiet companionship. Well-groomed and perfect for someone looking for a sophisticated feline friend.',
    seller: {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.6,
      totalReviews: 12,
      email: 'david.wilson@email.com',
      phone: '+1 (555) 321-9876',
      joinedDate: 'Member since 2023'
    }
  },
  '5': {
    id: '5',
    name: 'Storm',
    breed: 'Siberian Husky',
    age: '4 months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1674643928226-7265547151e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwaHVza3klMjBkb2d8ZW58MXx8fHwxNzU3NDIxNDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1674643928226-7265547151e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwaHVza3klMjBkb2d8ZW58MXx8fHwxNzU3NDIxNDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&h=400&fit=crop'
    ],
    location: 'Seattle, WA',
    vaccinated: true,
    registered: true,
    description: 'Storm is a majestic Siberian Husky with beautiful blue eyes and a thick coat. He\'s very active and needs lots of exercise. Great with children and other dogs. Loves to run and play outdoors.',
    seller: {
      id: '5',
      name: 'Amanda Parker',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b884?w=150',
      rating: 4.9,
      totalReviews: 27,
      email: 'amanda.parker@email.com',
      phone: '+1 (555) 654-3210',
      joinedDate: 'Member since 2020'
    }
  },
  '6': {
    id: '6',
    name: 'Coco',
    breed: 'Holland Lop Rabbit',
    age: '8 months',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1688472977827-c7e446e49efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmFiYml0JTIwYnVubnl8ZW58MXx8fHwxNzU3NDk1ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1688472977827-c7e446e49efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmFiYml0JTIwYnVubnl8ZW58MXx8fHwxNzU3NDk1ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1534043464124-3be32fe637c9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop'
    ],
    location: 'Austin, TX',
    vaccinated: true,
    registered: false,
    description: 'Coco is an adorable Holland Lop rabbit with soft fur and floppy ears. She\'s gentle and loves to be petted. Litter trained and enjoys eating fresh vegetables. Perfect for families with children.',
    seller: {
      id: '6',
      name: 'Jessica Adams',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 4.8,
      totalReviews: 15,
      email: 'jessica.adams@email.com',
      phone: '+1 (555) 789-0123',
      joinedDate: 'Member since 2022'
    }
  },
  '7': {
    id: '7',
    name: 'Luna',
    breed: 'Border Collie',
    age: '1 year',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1730242217397-0921b0f29c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYm9yZGVyJTIwY29sbGllJTIwZG9nfGVufDF8fHx8MTc1NzUwMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1730242217397-0921b0f29c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYm9yZGVyJTIwY29sbGllJTIwZG9nfGVufDF8fHx8MTc1NzUwMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&h=400&fit=crop'
    ],
    location: 'Portland, OR',
    vaccinated: true,
    registered: true,
    description: 'Luna is an intelligent and energetic Border Collie who loves learning new tricks and playing frisbee. She\'s extremely loyal and would make a perfect companion for an active family. Great with children and very obedient.',
    seller: {
      id: '7',
      name: 'James Miller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.9,
      totalReviews: 34,
      email: 'james.miller@email.com',
      phone: '+1 (555) 234-5678',
      joinedDate: 'Member since 2020'
    }
  },
  '8': {
    id: '8',
    name: 'Mittens',
    breed: 'Maine Coon',
    age: '2.5 months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1748992341389-fdc5c204ad13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWluZSUyMGNvb24lMjBjYXQlMjBmbHVmZnl8ZW58MXx8fHwxNzU3NTAwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1748992341389-fdc5c204ad13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWluZSUyMGNvb24lMjBjYXQlMjBmbHVmZnl8ZW58MXx8fHwxNzU3NTAwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=400&fit=crop'
    ],
    location: 'Boston, MA',
    vaccinated: true,
    registered: true,
    description: 'Mittens is a majestic Maine Coon with a gentle giant personality. He loves to cuddle and is very social with both humans and other cats. His fluffy coat requires regular grooming, but he\'s worth every bit of care.',
    seller: {
      id: '8',
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 4.7,
      totalReviews: 22,
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 345-6789',
      joinedDate: 'Member since 2021'
    }
  },
  '9': {
    id: '9',
    name: 'Rocky',
    breed: 'German Shepherd',
    age: '3 months',
    gender: 'Male',
    image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTczOTIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTczOTIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop'
    ],
    location: 'Denver, CO',
    vaccinated: true,
    registered: true,
    description: 'Rocky is a well-trained German Shepherd with excellent protective instincts. He\'s loyal, intelligent, and great with families. Knows advanced commands and would be perfect for someone looking for both a companion and a guardian.',
    seller: {
      id: '9',
      name: 'Robert Garcia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.8,
      totalReviews: 28,
      email: 'robert.garcia@email.com',
      phone: '+1 (555) 456-7890',
      joinedDate: 'Member since 2019'
    }
  },
  '10': {
    id: '10',
    name: 'Bella',
    breed: 'Labrador Mix',
    age: '5 months',
    gender: 'Female',
    image: 'https://images.unsplash.com/photo-1740090431148-34e013ff2cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHB1cHB5JTIwY3V0ZXxlbnwxfHx8fDE3NTc0MjExMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1740090431148-34e013ff2cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHB1cHB5JTIwY3V0ZXxlbnwxfHx8fDE3NTc0MjExMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop'
    ],
    location: 'Phoenix, AZ',
    vaccinated: false,
    registered: false,
    description: 'Bella is a sweet Labrador mix puppy who loves to play and explore. She\'s still learning basic training but is very eager to please. Vaccinations are scheduled and she\'ll make a wonderful addition to any loving family.',
    seller: {
      id: '10',
      name: 'Maria Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 4.6,
      totalReviews: 16,
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 567-8901',
      joinedDate: 'Member since 2023'
    }
  }
};

export default function PetProfile({ petId, onBack }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // no TypeScript cast — look up by key directly
  const pet = mockPetData[petId];

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Pet not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Browse</span>
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`rounded-full ${isLiked ? 'text-pink-500' : 'text-gray-500'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden rounded-2xl border-0 shadow-sm">
              <div className="aspect-[4/3] relative">
                <img
                  src={pet.images[currentImageIndex]}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {pet.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Pet Details */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h1>
                  <p className="text-xl text-gray-600">{pet.breed}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold">{pet.age}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold">{pet.gender}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold">{pet.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Health</p>
                    <p className="font-semibold">Vaccinated</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {pet.vaccinated && (
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    Vaccinated
                  </Badge>
                )}
                {pet.registered && (
                  <Badge className="bg-blue-100 text-blue-800 border-0">
                    <FileText className="h-3 w-3 mr-1" />
                    Registered
                  </Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Profile */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Meet the Owner</h3>

              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={pet.seller.avatar} alt={pet.seller.name} />
                  <AvatarFallback>{pet.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{pet.seller.name}</h4>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{pet.seller.rating}</span>
                    <span className="text-sm text-gray-500">({pet.seller.totalReviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-500">{pet.seller.joinedDate}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                  onClick={() => window.open(`mailto:${pet.seller.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>

                <Button
                  variant="outline"
                  className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open(`tel:${pet.seller.phone}`, '_blank')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </Card>

            {/* Adoption Button */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm">
              <Button
                onClick={() => setShowRequestModal(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl h-12 text-lg font-semibold"
              >
                <Heart className="h-5 w-5 mr-2" />
                Send Adoption Request
              </Button>

              <p className="text-sm text-gray-500 text-center mt-3">
                You'll be able to message the owner directly
              </p>
            </Card>
          </div>
        </div>

        {/* Full Width Description Section */}
        <div className="mt-8">
          <Card className="p-6 rounded-2xl border-0 shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">About {pet.name}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{pet.description}</p>
          </Card>
        </div>
      </div>

      {/* Adoption Request Modal */}
      <AdoptionRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        pet={pet}
      />
    </div>
  );
}

/* PropTypes for runtime validation */
PetProfile.propTypes = {
  petId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};
