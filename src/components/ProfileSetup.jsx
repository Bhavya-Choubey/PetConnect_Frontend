import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PawPrint, Upload, MapPin, Phone, User } from 'lucide-react';
import { toast } from 'sonner'; 

const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB

export default function ProfileSetup({ userRole, onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '', // data URL for preview
    phone: '',
    location: '',
    bio: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const LOCAL_USER_KEY = 'petconnect_user';

  // Helper: keep only digits
  const digitsOnly = (str) => (str || '').toString().replace(/\D/g, '');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_USER_KEY);
      if (raw) {
        const u = JSON.parse(raw);
        setFormData(prev => ({
          ...prev,
          name: u.name || prev.name,
          email: u.email || prev.email,
          phone: u.phone ? digitsOnly(u.phone) : prev.phone,
          location: u.location || prev.location,
          bio: u.bio || prev.bio,
          experience: u.experience || prev.experience
        }));
      }
    } catch (err) {
      // ignore
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: digitsOnly(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhonePaste = (e) => {
    const pasted = (e.clipboardData || window.clipboardData).getData('text') || '';
    const cleaned = digitsOnly(pasted);
    e.preventDefault();
    setFormData(prev => ({ ...prev, phone: cleaned }));
  };

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      setFileError('File is too large. Please select an image smaller than 2 MB.');
      setFormData(prev => ({ ...prev, avatar: '' }));
      setAvatarFile(null);
      e.target.value = '';
      return;
    }

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
    if (fileError) return;
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const existingRaw = localStorage.getItem(LOCAL_USER_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const toStore = {
        ...existing,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        experience: formData.experience,
        avatar: formData.avatar,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(toStore));
    } catch (err) {
      // ignore storage errors
    }

    setIsLoading(false);

    // Show success toast BEFORE navigating away / calling parent handler
    toast.success("Account created — Welcome! 🤟");

    // notify parent to continue (e.g., navigate to app)
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <PawPrint className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">PetConnect</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Complete Your Profile</h2>
          <p className="text-gray-600 mt-1">
            {userRole === 'buyer'
              ? 'Help us find the perfect pet for you'
              : 'Set up your profile to start listing pets'}
          </p>
        </div>

        <Card className="p-8 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  {formData.avatar ? (
                    <AvatarImage src={formData.avatar} alt="Profile" />
                  ) : (
                    <AvatarFallback className="text-xl">
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

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
              {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
            </div>

            {/* Basic Information */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" value={formData.name} readOnly className="rounded-xl bg-white/60 cursor-not-allowed" required />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} readOnly className="rounded-xl bg-white/60 cursor-not-allowed" required />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="\d{10,}"    
                      minLength={10}     
                      maxLength={10}       
                      value={formData.phone}
                      onChange={handleInputChange}
                      onPaste={handlePhonePaste}
                      className="pl-10 rounded-xl"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
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
              </div>
            </div>

            {/* Role-specific sections */}
            {userRole === 'buyer' ? (
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Pet Preferences</h3>
                <Label htmlFor="preferences">Bio</Label>
                <Textarea id="preferences" name="preferences" value={formData.preferences} onChange={handleInputChange} className="mt-1 rounded-xl" rows={3} placeholder="Write something about you..." />
              </div>
            ) : (
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">About You</h3>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} className="mt-1 rounded-xl" rows={4} placeholder="Tell potential adopters about yourself..." />
                <Label htmlFor="experience" className="mt-4 block">Experience with Pets</Label>
                <Textarea id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="mt-1 rounded-xl" rows={3} placeholder="Describe your experience..." />
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="submit" disabled={isLoading || !!fileError} className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8">
                {isLoading ? 'Saving...' : 'Complete Profile'}
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
