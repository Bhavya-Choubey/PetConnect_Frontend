import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PawPrint, Upload, MapPin, Phone, User } from 'lucide-react';

const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB

export default function ProfileSetup({ userRole, onComplete }) {
  const [formData, setFormData] = useState({
    avatar: '', // data URL for preview
    phone: '',
    location: '',
    city: '',
    state: '',
    bio: '',
    experience: '',
    housing: '',
    preferences: ''
  });
  const [avatarFile, setAvatarFile] = useState(null); // store File for upload
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      setFileError('File is too large. Please select an image smaller than 2 MB.');
      // clear preview & file
      setFormData(prev => ({ ...prev, avatar: '' }));
      setAvatarFile(null);
      e.target.value = '';
      return;
    }

    // Optionally check file type (image/*) — accept attribute already limits it in UI
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, avatar: ev.target.result || '' }));
      setAvatarFile(file);
    };
    reader.onerror = () => {
      setFileError('Failed to read file. Please try another image.');
      setFormData(prev => ({ ...prev, avatar: '' }));
      setAvatarFile(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if file error present, do not submit
    if (fileError) return;

    setIsLoading(true);

    // Example: If you want to upload file to server, create FormData and append avatarFile
    // const payload = new FormData();
    // payload.append('avatar', avatarFile);
    // payload.append('phone', formData.phone);
    // ... etc, then fetch POST to your endpoint.

    // Simulate API call (replace with your real request)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <PawPrint className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">PetConnect</h1>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Complete Your Profile</h2>
            <p className="text-gray-600 mt-1">
              {userRole === 'buyer'
                ? "Help us find the perfect pet for you"
                : "Set up your profile to start listing pets"
              }
            </p>
          </div>
        </div>

        <Card className="p-8 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  {/* AvatarImage expects a src; use data URL preview if set */}
                  {formData.avatar ? (
                    <AvatarImage src={formData.avatar} alt="Profile" />
                  ) : (
                    <>
                      <AvatarFallback className="text-xl">
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Upload button triggers file input */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={handleFileClick}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-2">Upload your profile picture (max 2 MB)</p>

              {fileError && (
                <p className="text-sm text-red-600 mt-2">{fileError}</p>
              )}
            </div>

            {/* Basic Information */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 rounded-xl"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="pl-10 rounded-xl"
                      placeholder="Your address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="rounded-xl"
                    placeholder="Your city"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Select onValueChange={handleSelectChange('state')}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Role-specific sections */}
            {userRole === 'buyer' ? (
              <>
                {/* Pet Preferences */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Pet Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="preferences">What type of pet are you looking for?</Label>
                      <Textarea
                        id="preferences"
                        name="preferences"
                        value={formData.preferences}
                        onChange={handleInputChange}
                        className="mt-1 rounded-xl"
                        placeholder="e.g., Small to medium dogs, cats, specific breeds..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="housing">Housing Situation</Label>
                      <Select onValueChange={handleSelectChange('housing')}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select your housing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house-no-yard">House without yard</SelectItem>
                          <SelectItem value="house-small-yard">House with small yard</SelectItem>
                          <SelectItem value="house-large-yard">House with large yard</SelectItem>
                          <SelectItem value="farm">Farm/Rural property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience">Pet Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="mt-1 rounded-xl"
                        placeholder="Tell us about your experience with pets..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Seller Information */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">About You</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="mt-1 rounded-xl"
                        placeholder="Tell potential adopters about yourself and your experience with pets..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Experience with Pets</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="mt-1 rounded-xl"
                        placeholder="Describe your experience breeding, raising, or caring for pets..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onComplete}
                className="rounded-xl"
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !!fileError}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

ProfileSetup.propTypes = {
  userRole: PropTypes.oneOf(['buyer', 'seller']).isRequired,
  onComplete: PropTypes.func.isRequired
};
