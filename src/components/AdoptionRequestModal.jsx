import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Heart, Send } from 'lucide-react';

export default function AdoptionRequestModal({ isOpen, onClose, pet }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
    livingSpace: '',
    otherPets: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto close after success message
    setTimeout(() => {
      setIsSubmitted(false);
      if (typeof onClose === 'function') onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        message: '',
        livingSpace: '',
        otherPets: '',
      });
    }, 2000);
  };

  // If showing the success state
  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Request Sent!</h3>
            <p className="text-gray-600">
              Your adoption request for {pet?.name} has been sent to {pet?.seller?.name}.
              They'll review your application and get back to you soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Adoption Request for {pet?.name}
          </DialogTitle>
          <p className="text-gray-600">
            Fill out this form to send an adoption request to {pet?.seller?.name}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-lg"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-lg"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-lg"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Pet Experience */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Pet Experience</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Previous Pet Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="mt-1 rounded-lg"
                  placeholder="Tell us about your experience with pets..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="livingSpace">Living Space *</Label>
                <Input
                  id="livingSpace"
                  name="livingSpace"
                  value={formData.livingSpace}
                  onChange={handleInputChange}
                  required
                  className="mt-1 rounded-lg"
                  placeholder="e.g., Apartment with balcony, House with yard"
                />
              </div>
              <div>
                <Label htmlFor="otherPets">Other Pets in Home</Label>
                <Input
                  id="otherPets"
                  name="otherPets"
                  value={formData.otherPets}
                  onChange={handleInputChange}
                  className="mt-1 rounded-lg"
                  placeholder="e.g., 1 cat, 2 dogs, or None"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Message</h3>
            <div>
              <Label htmlFor="message">Why {pet?.name} is perfect for you</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 rounded-lg"
                placeholder={`Tell ${pet?.seller?.name} why you'd be a great parent for ${pet?.name}...`}
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
