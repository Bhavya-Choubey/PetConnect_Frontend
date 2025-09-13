import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Heart, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
            <p className="text-gray-600">We're here to help with all your pet adoption needs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* About PetConnect */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-pink-500" />
                  About PetConnect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  PetConnect is dedicated to bringing together loving pets and caring families. 
                  Our platform makes pet adoption simple, safe, and joyful.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Happy Adoptions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Partner Shelters</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-600">support@petconnect.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-gray-600">1-800-PET-LOVE</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-gray-600">123 Pet Street, Animal City, AC 12345</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium">Support Hours</div>
                    <div className="text-sm text-gray-600">Mon-Fri: 9AM-6PM PST</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Adoption Process Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Safety & Trust
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Have a question or need help? We'd love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                {/* Response Time Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <div className="font-medium text-blue-800">Quick Response Guarantee</div>
                      <div className="text-sm text-blue-600">
                        We typically respond to all inquiries within 24 hours during business days.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Info */}
            <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Meet Our Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="font-medium">Support Team</div>
                    <div className="text-sm text-gray-600">Pet adoption experts</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="font-medium">Safety Team</div>
                    <div className="text-sm text-gray-600">Ensuring secure adoptions</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="font-medium">Care Team</div>
                    <div className="text-sm text-gray-600">Animal welfare advocates</div>
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
