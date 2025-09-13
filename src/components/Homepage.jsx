import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import PetCard from './PetCard';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';

// Mock data for pets
const mockPets = [
  // ... keep all your mock pets unchanged
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    image: 'https://images.unsplash.com/photo-1754499265662-a1b9367c95f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ29sZGVuJTIwcmV0cmlldmVyJTIwZG9nfGVufDF8fHx8MTc1NzQxNDk0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'New York, NY',
    vaccinated: true
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Tabby Cat',
    age: '6 months',
    image: 'https://images.unsplash.com/photo-1631432903354-0c818078e35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdGFiYnklMjBjYXQlMjBraXR0ZW58ZW58MXx8fHwxNzU3NDk2ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Los Angeles, CA',
    vaccinated: true
  },
  {
    id: '3',
    name: 'Max',
    breed: 'Beagle',
    age: '3 months',
    image: 'https://images.unsplash.com/photo-1685629334233-81d6d567e6bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYmVhZ2xlJTIwcHVwcHl8ZW58MXx8fHwxNzU3NDk2ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Chicago, IL',
    vaccinated: false
  },
  {
    id: '4',
    name: 'Princess',
    breed: 'Persian Cat',
    age: '1.5 years',
    image: 'https://images.unsplash.com/photo-1714696217563-7e89bb7bf631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHdoaXRlfGVufDF8fHx8MTc1NzQ5NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Miami, FL',
    vaccinated: true
  },
  {
    id: '5',
    name: 'Storm',
    breed: 'Siberian Husky',
    age: '4 years',
    image: 'https://images.unsplash.com/photo-1674643928226-7265547151e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwaHVza3klMjBkb2d8ZW58MXx8fHwxNzU3NDIxNDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Seattle, WA',
    vaccinated: true
  },
  {
    id: '6',
    name: 'Coco',
    breed: 'Holland Lop Rabbit',
    age: '8 months',
    image: 'https://images.unsplash.com/photo-1688472977827-c7e446e49efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmFiYml0JTIwYnVubnl8ZW58MXx8fHwxNzU3NDk1ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Austin, TX',
    vaccinated: true
  },
  {
    id: '7',
    name: 'Luna',
    breed: 'Border Collie',
    age: '1 year',
    image: 'https://images.unsplash.com/photo-1730242217397-0921b0f29c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYm9yZGVyJTIwY29sbGllJTIwZG9nfGVufDF8fHx8MTc1NzUwMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Portland, OR',
    vaccinated: true
  },
  {
    id: '8',
    name: 'Mittens',
    breed: 'Maine Coon',
    age: '2.5 years',
    image: 'https://images.unsplash.com/photo-1748992341389-fdc5c204ad13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWluZSUyMGNvb24lMjBjYXQlMjBmbHVmZnl8ZW58MXx8fHwxNzU3NTAwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Boston, MA',
    vaccinated: true
  },
  {
    id: '9',
    name: 'Rocky',
    breed: 'German Shepherd',
    age: '3 years',
    image: 'https://images.unsplash.com/photo-1649571069618-99a265749d5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NTczOTIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Denver, CO',
    vaccinated: true
  },
  {
    id: '10',
    name: 'Bella',
    breed: 'Labrador Mix',
    age: '5 months',
    image: 'https://images.unsplash.com/photo-1740090431148-34e013ff2cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHB1cHB5JTIwY3V0ZXxlbnwxfHx8fDE3NTc0MjExMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Phoenix, AZ',
    vaccinated: false
  },
  {
    id: '11',
    name: 'Shadow',
    breed: 'Russian Blue Cat',
    age: '4 years',
    image: 'https://images.unsplash.com/photo-1612718908786-de5aeecfab79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXNzaWFuJTIwYmx1ZSUyMGNhdHxlbnwxfHx8fDE3NTc1MDAzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'San Diego, CA',
    vaccinated: true
  },
  {
    id: '12',
    name: 'Charlie',
    breed: 'French Bulldog',
    age: '18 months',
    image: 'https://images.unsplash.com/photo-1674542677476-57aa9c6d24bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBidWxsZG9nJTIwY3V0ZXxlbnwxfHx8fDE3NTc0Mzg0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Nashville, TN',
    vaccinated: true
  },
  {
    id: '13',
    name: 'Snowball',
    breed: 'Angora Rabbit',
    age: '1 year',
    image: 'https://images.unsplash.com/photo-1534043464124-3be32fe637c9?w=400&h=400&fit=crop',
    location: 'Salt Lake City, UT',
    vaccinated: true
  },
  {
    id: '14',
    name: 'Diesel',
    breed: 'Rottweiler',
    age: '2 years',
    image: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=400&h=400&fit=crop',
    location: 'Las Vegas, NV',
    vaccinated: true
  },
  {
    id: '15',
    name: 'Mochi',
    breed: 'Shiba Inu',
    age: '6 months',
    image: 'https://images.unsplash.com/photo-1635800513135-0098b3e4943e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGliYSUyMGludSUyMHB1cHB5fGVufDF8fHx8MTc1NzUwMDM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'San Jose, CA',
    vaccinated: true
  }
];

export default function Homepage({ onPetSelect, wishlistedPets, onToggleWishlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [vaccinatedOnly, setVaccinatedOnly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPets = mockPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase());

    // fixed precedence with parentheses
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'dog' && (
        pet.breed.toLowerCase().includes('retriever') ||
        pet.breed.toLowerCase().includes('beagle') ||
        pet.breed.toLowerCase().includes('husky') ||
        pet.breed.toLowerCase().includes('shiba') ||
        pet.breed.toLowerCase().includes('collie') // added collie so collies count as dogs
      )) ||
      (selectedType === 'cat' && pet.breed.toLowerCase().includes('cat')) ||
      (selectedType === 'rabbit' && pet.breed.toLowerCase().includes('rabbit'));

    const matchesVaccinated = !vaccinatedOnly || pet.vaccinated;
    
    return matchesSearch && matchesType && matchesVaccinated;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 via-green-100 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Find Your Next <span className="text-green-600">Fur-ever</span> Friend
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with loving pets looking for their perfect home
          </p>
          
          {/* Search Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32 h-12 rounded-xl">
                    <SelectValue placeholder="Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                    <SelectItem value="rabbit">Rabbits</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger className="w-32 h-12 rounded-xl">
                    <SelectValue placeholder="Age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="young">Young (&lt; 1 year)</SelectItem>
                    <SelectItem value="adult">Adult (1-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (&gt; 5 years)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant={vaccinatedOnly ? "default" : "outline"}
                  onClick={() => setVaccinatedOnly(!vaccinatedOnly)}
                  className="h-12 px-6 rounded-xl"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Vaccinated Only
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Pets Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">New Pets</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Heart className="h-5 w-5 mr-2 text-pink-500" />
              <span>{filteredPets.length} pets found</span>
            </div>
            {/* Navigation arrows */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 4))}
                disabled={currentIndex === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentIndex(Math.min(filteredPets.length - 8, currentIndex + 4))}
                disabled={currentIndex >= filteredPets.length - 8}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Pet Cards - 4x2 Grid showing 8 pets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[600px]">
          {filteredPets.slice(currentIndex, currentIndex + 8).map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onViewClick={onPetSelect}
              isWishlisted={wishlistedPets.has(pet.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
        
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No pets found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        )}

        {/* Pagination indicators */}
        {filteredPets.length > 8 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(filteredPets.length / 8) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * 8)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / 8) === index 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Testimonials and About Section */}
      <TestimonialsSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

/* PropTypes to mirror the original TypeScript interface */
Homepage.propTypes = {
  onPetSelect: PropTypes.func.isRequired,
  wishlistedPets: PropTypes.instanceOf(Set),
  onToggleWishlist: PropTypes.func.isRequired,
};

Homepage.defaultProps = {
  wishlistedPets: new Set(),
};
