import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Heart, Send } from 'lucide-react';

/**
 * AdoptionRequestModal
 * Props:
 *  - isOpen: boolean
 *  - onClose: function
 *  - pet: pet object
 *  - currentUser: optional user object (overrides localStorage)
 */
export default function AdoptionRequestModal({ isOpen, onClose, pet, currentUser }) {
  const LOCAL_USER_KEY = 'petconnect_user';

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

  // Load current user from prop or fallback to localStorage (petconnect_user)
  useEffect(() => {
    let user = currentUser;
    if (!user) {
      try {
        const stored = localStorage.getItem(LOCAL_USER_KEY);
        if (stored) user = JSON.parse(stored);
      } catch (err) {
        user = null;
      }
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name ?? prev.name,
        email: user.email ?? prev.email,
        phone: user.phone ?? prev.phone,
      }));
    }
    // refresh when modal opens so latest profile is used
  }, [currentUser, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // protect the read-only fields
    if (name === 'name' || name === 'email' || name === 'phone') return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call — replace with your real endpoint later
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Auto close after success message and keep user info persistent
    setTimeout(() => {
      setIsSubmitted(false);
      if (typeof onClose === 'function') onClose();

      setFormData((prev) => ({
        name: prev.name,
        email: prev.email,
        phone: prev.phone,
        experience: '',
        message: '',
        livingSpace: '',
        otherPets: '',
      }));
    }, 2000);
  };

  // Success state
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
          {/* Personal Information (read-only user fields shown row-wise) */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>

            {/* Grid: Each row has two columns -> label and value */}
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <Label>Full Name</Label>
                </div>
                <div className="col-span-2">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                    aria-readonly="true"
                    className="mt-1 rounded-lg bg-white/60 cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <Label>Email Address</Label>
                </div>
                <div className="col-span-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    aria-readonly="true"
                    className="mt-1 rounded-lg bg-white/60 cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1">
                  <Label>Phone Number</Label>
                </div>
                <div className="col-span-2">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    readOnly
                    aria-readonly="true"
                    className="mt-1 rounded-lg bg-white/60 cursor-not-allowed"
                    placeholder="+91 98765 43210"
                  />
                </div>
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
