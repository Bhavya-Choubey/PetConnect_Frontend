import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import PetCard from './PetCard';

// Mock pets data - in a real app this would come from your data source
const mockPets = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 months',
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
    id: '4',
    name: 'Princess',
    breed: 'Persian Cat',
    age: '1.5 months',
    image: 'https://images.unsplash.com/photo-1714696217563-7e89bb7bf631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcGVyc2lhbiUyMGNhdCUyMHdoaXRlfGVufDF8fHx8MTc1NzQ5NjgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Miami, FL',
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
    id: '15',
    name: 'Mochi',
    breed: 'Shiba Inu',
    age: '6 months',
    image: 'https://images.unsplash.com/photo-1635800513135-0098b3e4943e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGliYSUyMGludSUyMHB1cHB5fGVufDF8fHx8MTc1NzUwMDM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'San Jose, CA',
    vaccinated: true
  }
];

export default function WishlistPage({ onBack, wishlistedPets, onToggleWishlist, onPetSelect }) {
  const wishlistedPetData = mockPets.filter(pet => wishlistedPets.has(pet.id));

  const handleClearAll = () => {
    wishlistedPetData.forEach(pet => {
      onToggleWishlist(pet.id);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4 hover:bg-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Wishlists</h1>
              <p className="text-gray-600">Pets you've saved for later</p>
            </div>
          </div>

          {wishlistedPetData.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Stats Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-6 w-6 mr-2 text-pink-500" />
              Wishlist Summary
            </CardTitle>
            <CardDescription>
              Keep track of your favorite pets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">{wishlistedPetData.length}</div>
                <div className="text-sm text-gray-600">Total Favorites</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {wishlistedPetData.filter(pet => pet.breed.toLowerCase().includes('dog') || pet.breed.toLowerCase().includes('retriever') || pet.breed.toLowerCase().includes('collie') || pet.breed.toLowerCase().includes('inu')).length}
                </div>
                <div className="text-sm text-gray-600">Dogs</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {wishlistedPetData.filter(pet => pet.breed.toLowerCase().includes('cat')).length}
                </div>
                <div className="text-sm text-gray-600">Cats</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {wishlistedPetData.filter(pet => pet.vaccinated).length}
                </div>
                <div className="text-sm text-gray-600">Vaccinated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlisted Pets Grid */}
        {wishlistedPetData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedPetData.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewClick={onPetSelect}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <Heart className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start browsing pets and click the heart icon to add them to your wishlist. 
                This way you can easily find them later!
              </p>
              <Button 
                onClick={onBack}
                className="bg-green-600 hover:bg-green-700"
              >
                Browse Pets
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Tips Section */}
        {wishlistedPetData.length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">💡 Wishlist Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click the heart again to remove a pet from your wishlist</li>
                <li>• Contact pet owners directly from the pet's detail page</li>
                <li>• Check back regularly as new pets are added daily</li>
                <li>• Consider multiple pets to increase your chances of finding the perfect match</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

WishlistPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  wishlistedPets: PropTypes.instanceOf(Set).isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  onPetSelect: PropTypes.func.isRequired
};
