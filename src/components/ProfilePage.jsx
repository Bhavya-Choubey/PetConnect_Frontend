import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Camera, MapPin, Phone, Mail, Calendar, User } from 'lucide-react';

export default function ProfilePage({ user, onBack }) {
  const safeName = user?.name ?? '';
  const safeEmail = user?.email ?? '';
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: safeName,
    phone: user?.phone ?? '9876543210',
    location: user?.location ?? 'New York, NY',
    bio: user?.bio ?? 'Pet lover and enthusiast looking for the perfect furry companion.'
  });

  // Restrict input for name and phone
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      // Only digits
      const cleaned = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, phone: cleaned }));
    } else if (id === 'name') {
      // Only letters and spaces
      const cleaned = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, name: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', formData);
    // TODO: persist changes (e.g., localStorage or API)
  };

  const handleCancel = () => {
    // reset edits to original user data
    setFormData({
      name: safeName,
      phone: user?.phone ?? formData.phone,
      location: user?.location ?? formData.location,
      bio: user?.bio ?? formData.bio
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 hover:bg-white/50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* grid: left column auto-sized, right column flexible */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,320px)_1fr] gap-8">
          {/* Profile Card (left) */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={safeName || safeEmail} />
                    ) : (
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-green-100">
                        {(safeName && safeName.charAt(0).toUpperCase()) || (safeEmail && safeEmail.charAt(0).toUpperCase()) || 'U'}
                      </AvatarFallback>
                    )}
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

                <h2 className="text-2xl font-bold text-gray-800 mb-2 break-words">
                  {formData.name?.trim() || safeName || (safeEmail ? safeEmail.split('@')[0] : 'User')}
                  <br/>
                </h2>

                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-3" />
                    <span className="text-sm break-all">{safeEmail || '—'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-3" />
                    <span className="text-sm">{formData.phone || '—'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-3" />
                    <span className="text-sm">{formData.location || '—'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-3" />
                    <span className="text-sm">Joined September 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details (right) */}
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
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1"
                  />
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
