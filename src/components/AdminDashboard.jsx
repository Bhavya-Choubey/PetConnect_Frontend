// @ts-nocheck
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import { Users, PawPrint, AlertTriangle, TrendingUp, Search, Shield, X, Eye, Ban } from 'lucide-react';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    type: 'seller',
    joinDate: '2024-01-15',
    listings: 3,
    status: 'active',
    reports: 0,
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@email.com',
    type: 'buyer',
    joinDate: '2024-01-20',
    listings: 0,
    status: 'active',
    reports: 0,
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.w@email.com',
    type: 'seller',
    joinDate: '2024-01-18',
    listings: 1,
    status: 'blocked',
    reports: 2,
  },
];

const mockPets = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    seller: 'Sarah Johnson',
    status: 'active',
    reports: 0,
    datePosted: '2024-01-15',
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Tabby Cat',
    seller: 'John Doe',
    status: 'flagged',
    reports: 1,
    datePosted: '2024-01-18',
  },
];

const chartData = [
  { month: 'Jan', users: 120, pets: 85, adoptions: 45 },
  { month: 'Feb', users: 150, pets: 110, adoptions: 67 },
  { month: 'Mar', users: 180, pets: 135, adoptions: 89 },
  { month: 'Apr', users: 220, pets: 165, adoptions: 112 },
  { month: 'May', users: 260, pets: 190, adoptions: 134 },
];

const petTypeData = [
  { name: 'Dogs', value: 45, color: '#22c55e' },
  { name: 'Cats', value: 30, color: '#3b82f6' },
  { name: 'Rabbits', value: 15, color: '#f59e0b' },
  { name: 'Others', value: 10, color: '#ef4444' },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Handlers (JS — no TS annotations)
  const handleUserAction = (userId, action) => {
    // TODO: wire to real API
    console.log(`${action} user ${userId}`);
  };

  const handlePetAction = (petId, action) => {
    // TODO: wire to real API
    console.log(`${action} pet ${petId}`);
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPets = mockPets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // derive counts from mock data (replace with real API values)
  const totalUsersCount = mockUsers.length + 1242; // keep existing display ~1245 (mock + sample)
  const totalPetsCount = mockPets.length + 385; // ~387
  const pendingReportsCount = 6; // example pending reports count

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor platform activity and manage users</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats - now with 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Users</p>
                <p className="text-2xl font-bold text-blue-800">{totalUsersCount.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Pets</p>
                <p className="text-2xl font-bold text-green-800">{totalPetsCount.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <PawPrint className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Pending Reports</p>
                <p className="text-2xl font-bold text-orange-800">{pendingReportsCount}</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">Needs review</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-1 shadow-sm border-0">
            <TabsTrigger value="overview" className="rounded-xl">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl">
              Users
            </TabsTrigger>
            <TabsTrigger value="pets" className="rounded-xl">
              Pet Listings
            </TabsTrigger>
            <TabsTrigger value="reports" className="rounded-xl">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Growth Chart */}
              <Card className="p-6 rounded-2xl border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="pets" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="adoptions" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Pet Types Distribution */}
              <Card className="p-6 rounded-2xl border-0 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pet Types Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={petTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {petTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {petTypeData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64 rounded-xl" />
              </div>
            </div>

            <Card className="rounded-2xl border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{user.listings}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className={`${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} border-0`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.reports > 0 ? <Badge className="bg-orange-100 text-orange-800 border-0">{user.reports}</Badge> : <span className="text-gray-500">0</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'view')} className="rounded-lg">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'block')} className="rounded-lg text-red-600">
                              <Ban className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, 'approve')} className="rounded-lg text-green-600">
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Pet Listings Tab */}
          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Pet Listings Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search pets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64 rounded-xl" />
              </div>
            </div>

            <Card className="rounded-2xl border-0 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pet</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-800">{pet.name}</p>
                          <p className="text-sm text-gray-500">{pet.breed}</p>
                        </div>
                      </TableCell>
                      <TableCell>{pet.seller}</TableCell>
                      <TableCell>{new Date(pet.datePosted).toLocaleDateString()}</TableCell>
                      <TableCell>{pet.reports > 0 ? <Badge className="bg-orange-100 text-orange-800 border-0">{pet.reports}</Badge> : <span className="text-gray-500">0</span>}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePetAction(pet.id, 'view')} className="rounded-lg">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {pet.status === 'flagged' && (
                            <Button variant="ghost" size="sm" onClick={() => handlePetAction(pet.id, 'approve')} className="rounded-lg text-green-600">
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handlePetAction(pet.id, 'remove')} className="rounded-lg text-red-600">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Reported Content</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 rounded-2xl border-0 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Reports</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Inappropriate pet listing</p>
                      <p className="text-sm text-gray-600">Pet "Max" reported for misleading information</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Spam user account</p>
                      <p className="text-sm text-gray-600">User "mike.w@email.com" reported for spam</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Review
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-0 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4">Report Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reports</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Resolved This Week</span>
                    <span className="font-semibold text-green-600">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending Review</span>
                    <span className="font-semibold text-orange-600">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Response Time</span>
                    <span className="font-semibold">4.2 hours</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
