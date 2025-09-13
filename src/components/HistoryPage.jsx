import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, Eye, Trash2, Calendar } from 'lucide-react';

// Mock pets data - in a real app this would come from your data source
const mockPets = [
  // ... (keep your mock data objects the same)
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

export default function HistoryPage({ onBack, viewHistory, onPetSelect }) {
  const viewedPets = viewHistory.map(petId => mockPets.find(pet => pet.id === petId)).filter(Boolean);

  const getTimeAgo = (index) => {
    const times = ['Just now', '5 minutes ago', '1 hour ago', '2 hours ago', '1 day ago', '2 days ago', '1 week ago'];
    return times[index] || `${index} days ago`;
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
              <h1 className="text-3xl font-bold text-gray-800">Viewing History</h1>
              <p className="text-gray-600">Pets you've recently viewed</p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-blue-500" />
              History Summary
            </CardTitle>
            <CardDescription>
              Track your browsing activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{viewedPets.length}</div>
                <div className="text-sm text-gray-600">Pets Viewed</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {viewedPets.filter(pet => pet && (pet.breed.toLowerCase().includes('dog') || pet.breed.toLowerCase().includes('retriever') || pet.breed.toLowerCase().includes('collie') || pet.breed.toLowerCase().includes('inu') || pet.breed.toLowerCase().includes('beagle'))).length}
                </div>
                <div className="text-sm text-gray-600">Dogs</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {viewedPets.filter(pet => pet && pet.breed.toLowerCase().includes('cat')).length}
                </div>
                <div className="text-sm text-gray-600">Cats</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        {viewedPets.length > 0 ? (
          <div className="space-y-4">
            {viewedPets.map((pet, index) => (
              pet && (
                <Card
                  key={`${pet.id}-${index}`}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onPetSelect(pet.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Pet Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      </div>

                      {/* Pet Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {pet.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {getTimeAgo(index)}
                          </div>
                        </div>

                        <p className="text-gray-600 mt-1">{pet.breed}</p>

                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {pet.age}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pet.location}
                          </div>
                          {pet.vaccinated && (
                            <Badge className="bg-green-100 text-green-800">
                              Vaccinated
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="flex-shrink-0">
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPetSelect(pet.id);
                          }}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Again
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <Clock className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No viewing history yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start browsing pets to see your viewing history here.
                This helps you keep track of pets you've been interested in.
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
        {viewedPets.length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">📖 History Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your most recently viewed pets appear at the top</li>
                <li>• Click "View Again" to revisit a pet's details</li>
                <li>• History helps you remember pets you were considering</li>
                <li>• Use this to compare different pets you've looked at</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

/* PropTypes to mirror the original TypeScript interface */
HistoryPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  viewHistory: PropTypes.arrayOf(PropTypes.string),
  onPetSelect: PropTypes.func.isRequired,
};

HistoryPage.defaultProps = {
  viewHistory: [],
};
