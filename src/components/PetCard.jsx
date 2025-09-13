import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Heart } from 'lucide-react';

export default function PetCard({ pet, onViewClick, isWishlisted = false, onToggleWishlist }) {
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(pet.id);
    }
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-2xl border-0 shadow-sm bg-white cursor-pointer"
      onClick={() => onViewClick(pet.id)}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {pet.vaccinated && (
          <Badge className="absolute top-3 left-3 bg-green-100 text-green-800 border-0">
            Vaccinated
          </Badge>
        )}
        {/* Wishlist Heart Icon */}
        {onToggleWishlist && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-9 w-9 backdrop-blur-sm"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </Button>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
        </div>

        <p className="text-gray-600 mb-3">{pet.breed}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{pet.age}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{pet.location}</span>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onViewClick(pet.id);
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}

/* PropTypes to mirror the original TypeScript interfaces */
PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    vaccinated: PropTypes.bool
  }).isRequired,
  onViewClick: PropTypes.func.isRequired,
  isWishlisted: PropTypes.bool,
  onToggleWishlist: PropTypes.func
};

PetCard.defaultProps = {
  isWishlisted: false,
  onToggleWishlist: undefined
};
