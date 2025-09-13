import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Camera, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';

export default function ProfilePage({ user, onBack }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Pet lover and enthusiast looking for the perfect furry companion.',
    experience: 'First-time pet owner',
    preferences: 'Dogs, Cats'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically update the user data
    console.log('Saving profile data:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-green-100">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {formData.name || user.email.split('@')[0]}
                </h2>

                <Badge
                  variant="secondary"
                  className="mb-4 bg-green-100 text-green-800 capitalize"
                >
                  {user.role}
                </Badge>

                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">{formData.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3" />
                    <span className="text-sm">{formData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-3" />
                    <span className="text-sm">Joined September 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {user.role === 'buyer' && (
                  <>
                    <div>
                      <Label htmlFor="experience">Pet Experience</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="First-time pet owner">First-time pet owner</SelectItem>
                          <SelectItem value="Some experience">Some experience</SelectItem>
                          <SelectItem value="Very experienced">Very experienced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferences">Pet Preferences</Label>
                      <Input
                        id="preferences"
                        value={formData.preferences}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferences: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="e.g., Dogs, Cats, Small pets"
                        className="mt-1"
                      />
                    </div>
                  </>
                )}

                {/* Account Stats */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Pets Viewed</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">5</div>
                      <div className="text-sm text-gray-600">Favorites</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2</div>
                      <div className="text-sm text-gray-600">Applications</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PropTypes */
const UserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['buyer', 'seller', 'admin']).isRequired,
  name: PropTypes.string,
  avatar: PropTypes.string
});

ProfilePage.propTypes = {
  user: UserPropType.isRequired,
  onBack: PropTypes.func.isRequired
};
