import React, { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Upload, Eye, Edit, Trash2, CheckCircle, XCircle, User, MessageSquare } from 'lucide-react';

// Mock data
const mockListings = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: '2 years',
    status: 'available',
    image:
      'https://images.unsplash.com/photo-1754499265662-a1b9367c95f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    views: 142,
    inquiries: 8,
    datePosted: '2024-01-15'
  },
  {
    id: '2',
    name: 'Princess',
    breed: 'Persian Cat',
    age: '1.5 years',
    status: 'adopted',
    image:
      'https://images.unsplash.com/photo-1714696217563-7e89bb7bf631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    views: 89,
    inquiries: 12,
    datePosted: '2024-01-10'
  }
];

const mockRequests = [
  {
    id: '1',
    petName: 'Buddy',
    petId: '1',
    applicant: {
      name: 'John Smith',
      email: 'john@email.com',
      phone: '+1 (555) 987-6543'
    },
    message:
      'I would love to adopt Buddy. I have experience with Golden Retrievers and have a large backyard.',
    status: 'pending',
    dateSubmitted: '2024-01-20'
  },
  {
    id: '2',
    petName: 'Buddy',
    petId: '1',
    applicant: {
      name: 'Emily Johnson',
      email: 'emily@email.com',
      phone: '+1 (555) 234-5678'
    },
    message: 'Buddy looks perfect for our family. We have two kids who would love to play with him.',
    status: 'pending',
    dateSubmitted: '2024-01-18'
  }
];

const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB

// keywords for species detection in filenames (heuristic)
const speciesKeywords = {
  dog: ['dog', 'doggy', 'puppy', 'canine', 'retriever', 'beagle', 'labrador', 'pup'],
  cat: ['cat', 'kitten', 'feline', 'persian', 'siamese', 'tabby'],
  rabbit: ['rabbit', 'bunny', 'hare'],
  bird: ['bird', 'parrot', 'cockatiel', 'budgie'],
  rodent: ['hamster', 'rat', 'mouse', 'guinea', 'gerbil'],
  other: [] // allow anything for 'other' (but will still forbid filenames that match other explicit species if you want)
};

// helper: returns true if filename contains any keyword from the list
function filenameHasKeyword(filename = '', keywords = []) {
  const lower = filename.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

// check that filename does NOT strongly indicate a different species than the one selected
function filenameIndicatesDifferentSpecies(filename = '', selectedSpecies = '') {
  if (!filename) return false;
  const selected = selectedSpecies ? selectedSpecies.toLowerCase() : '';
  // build list of keywords for other species
  for (const [species, keywords] of Object.entries(speciesKeywords)) {
    if (!species) continue;
    if (species === selected) continue; // skip selected species
    if (filenameHasKeyword(filename, keywords)) {
      return { conflict: true, speciesMatched: species };
    }
  }
  return { conflict: false };
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('listings');

  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    species: '',
    description: '',
    vaccinated: false,
    registered: false
  });

  // file state
  const [photoFile, setPhotoFile] = useState(null); // File object
  const [photoPreview, setPhotoPreview] = useState(''); // data URL for preview
  const [fileError, setFileError] = useState('');

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({ ...prev, [name]: value }));
    // clear file error when fields change
    setFileError('');
  };

  const handleSelectChange = (field) => (value) => {
    setNewPet((prev) => ({ ...prev, [field]: value }));
    setFileError('');
  };

  const handleSwitchChange = (name) => (checked) => {
    setNewPet((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // only one image allowed
    if (e.target.files.length > 1) {
      setFileError('Please upload only one image per listing.');
      e.target.value = '';
      return;
    }

    // size check
    if (file.size > MAX_FILE_BYTES) {
      setFileError('File is too large. Please select an image smaller than 2 MB.');
      setPhotoFile(null);
      setPhotoPreview('');
      e.target.value = '';
      return;
    }

    // mime type check (image/*)
    if (!file.type.startsWith('image/')) {
      setFileError('Only image files are allowed (png, jpg, gif, etc.).');
      setPhotoFile(null);
      setPhotoPreview('');
      e.target.value = '';
      return;
    }

    // species-specific filename heuristic: ensure filename doesn't strongly indicate a different species
    if (newPet.species && newPet.species !== 'other') {
      const { conflict, speciesMatched } = filenameIndicatesDifferentSpecies(file.name, newPet.species);
      if (conflict) {
        setFileError(`Filename suggests the image may be of a different species (${speciesMatched}). Please upload an image of the selected species (${newPet.species}).`);
        setPhotoFile(null);
        setPhotoPreview('');
        e.target.value = '';
        return;
      }
    }

    // read preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target.result || '');
      setPhotoFile(file);
    };
    reader.onerror = () => {
      setFileError('Failed to read file. Please try another image.');
      setPhotoFile(null);
      setPhotoPreview('');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newPet.name || !newPet.breed || !newPet.age || !newPet.gender || !newPet.species) {
      setFileError('Please complete all required fields and upload a valid image (if applicable).');
      return;
    }

    if (fileError) {
      // block submit if file error exists
      return;
    }

    // Build payload (example)
    const payload = new FormData();
    payload.append('name', newPet.name);
    payload.append('breed', newPet.breed);
    payload.append('age', newPet.age);
    payload.append('gender', newPet.gender);
    payload.append('species', newPet.species);
    payload.append('description', newPet.description);
    payload.append('vaccinated', newPet.vaccinated);
    payload.append('registered', newPet.registered);
    if (photoFile) payload.append('photo', photoFile);

    console.log('Posting new pet listing. Keys:', [...payload.keys()]);
    // TODO: send to server (fetch/axios). For now reset UI:
    setNewPet({
      name: '',
      breed: '',
      age: '',
      gender: '',
      species: '',
      description: '',
      vaccinated: false,
      registered: false
    });
    removePhoto();
    setActiveTab('listings');
  };

  const togglePetStatus = (id, currentStatus) => {
    console.log(`Toggling pet ${id} from ${currentStatus}`);
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
            <p className="text-gray-600 mt-2">Manage your pet listings and adoption requests</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Active Listings</p>
                <p className="text-2xl font-bold text-blue-800">
                  {mockListings.filter((pet) => pet.status === 'available').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Successful Adoptions</p>
                <p className="text-2xl font-bold text-green-800">
                  {mockListings.filter((pet) => pet.status === 'adopted').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Pending Requests</p>
                <p className="text-2xl font-bold text-orange-800">
                  {mockRequests.filter((req) => req.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-purple-800">
                  {mockListings.reduce((sum, pet) => sum + pet.views, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-2xl p-1 shadow-sm border-0">
            <TabsTrigger value="listings" className="rounded-xl">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="requests" className="rounded-xl">
              Adoption Requests
            </TabsTrigger>
            <TabsTrigger value="add" className="rounded-xl">
              Add New Pet
            </TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Pet Listings</h2>
              <Button
                onClick={() => setActiveTab('add')}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Pet
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockListings.map((pet) => (
                <Card key={pet.id} className="overflow-hidden rounded-2xl border-0 shadow-sm">
                  <div className="flex">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{pet.name}</h3>
                          <p className="text-sm text-gray-600">
                            {pet.breed} • {pet.age}
                          </p>
                        </div>
                        <Badge
                          variant={pet.status === 'available' ? 'default' : 'secondary'}
                          className={`${
                            pet.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          } border-0`}
                        >
                          {pet.status === 'available' ? 'Available' : 'Adopted'}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{pet.views} views</span>
                        <span>{pet.inquiries} inquiries</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Switch checked={pet.status === 'available'} onCheckedChange={() => togglePetStatus(pet.id, pet.status)} />
                          <span className="text-sm text-gray-600">Available</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="rounded-lg">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="rounded-lg text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Adoption Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Adoption Requests</h2>

            <div className="space-y-4">
              {mockRequests.map((request) => (
                <Card key={request.id} className="p-6 rounded-2xl border-0 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Request for {request.petName}</h3>
                      <p className="text-sm text-gray-500">Submitted on {new Date(request.dateSubmitted).toLocaleDateString()}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">{request.status}</Badge>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{request.applicant.name}</h4>
                        <p className="text-sm text-gray-600">{request.applicant.email}</p>
                        <p className="text-sm text-gray-600">{request.applicant.phone}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">{request.message}</p>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={() => handleRequestAction(request.id, 'accept')} className="bg-green-500 hover:bg-green-600 text-white rounded-xl">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button onClick={() => handleRequestAction(request.id, 'reject')} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                    <Button onClick={() => handleRequestAction(request.id, 'pending')} variant="outline" className="border-yellow-200 text-yellow-600 hover:bg-red-50 rounded-xl">
                      <User className="h-4 w-4 mr-2" />
                      Mark as Pending
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add New Pet Tab */}
          <TabsContent value="add" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Pet Listing</h2>

            <Card className="p-8 rounded-2xl border-0 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pet Photo (single) */}
                <div>
                  <Label>Pet Photo (1 image only)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {!photoPreview ? (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 2 MB. Only one image allowed.</p>
                        <div className="mt-4">
                          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          <Button type="button" variant="outline" onClick={handleFileClick} className="rounded-xl">
                            Choose File
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-40 h-40 overflow-hidden rounded-md border">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">{photoFile ? photoFile.name : 'Selected image'}</p>
                          <p className="text-sm text-gray-500">{photoFile ? `${(photoFile.size / 1024 / 1024).toFixed(2)} MB` : ''}</p>
                          <div className="mt-3 flex space-x-2">
                            <Button type="button" variant="ghost" onClick={removePhoto} className="rounded-xl text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                            <Button type="button" variant="outline" onClick={handleFileClick} className="rounded-xl">
                              Replace
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {fileError && <p className="text-sm text-red-600 mt-3">{fileError}</p>}
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Pet Name *</Label>
                    <Input id="name" name="name" value={newPet.name} onChange={handleInputChange} required className="mt-1 rounded-xl" placeholder="Enter pet's name" />
                  </div>

                  <div>
                    <Label htmlFor="species">Species *</Label>
                    <Select value={newPet.species} onValueChange={handleSelectChange('species')}>
                      <SelectTrigger className="mt-1 rounded-xl">
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rodent">Rodent</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="breed">Breed *</Label>
                    <Input id="breed" name="breed" value={newPet.breed} onChange={handleInputChange} required className="mt-1 rounded-xl" placeholder="e.g., Golden Retriever" />
                  </div>

                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" name="age" value={newPet.age} onChange={handleInputChange} required className="mt-1 rounded-xl" placeholder="e.g., 2 years, 6 months" />
                  </div>

                  <div>
                    <Label>Gender *</Label>
                    <Select value={newPet.gender} onValueChange={(value) => setNewPet((prev) => ({ ...prev, gender: value }))}>
                      <SelectTrigger className="mt-1 rounded-xl">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Health Information */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Health Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Vaccinated</Label>
                        <p className="text-sm text-gray-600">Pet has received all required vaccinations</p>
                      </div>
                      <Switch checked={newPet.vaccinated} onCheckedChange={handleSwitchChange('vaccinated')} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Registered</Label>
                        <p className="text-sm text-gray-600">Pet is registered with official kennel club</p>
                      </div>
                      <Switch checked={newPet.registered} onCheckedChange={handleSwitchChange('registered')} />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={newPet.description} onChange={handleInputChange} className="mt-1 rounded-xl" placeholder="Tell potential adopters about your pet's personality, habits, and special needs..." rows={5} />
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('listings')} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-xl" disabled={!!fileError}>
                    Post Listing
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
