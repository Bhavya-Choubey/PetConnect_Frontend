import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PawPrint, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

/**
 * Login component
 * Props:
 *  - onLogin: function({ id, email, role: 'buyer'|'seller'|'admin', isNewUser })
 */
export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer' // 'buyer' | 'seller'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock login - check if admin
    const isAdmin = loginData.email === 'admin@petconnect.com';
    const role = isAdmin ? 'admin' : 'buyer';

    onLogin({
      id: '1',
      email: loginData.email,
      role,
      isNewUser: false
    });

    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onLogin({
      id: '2',
      email: registerData.email,
      role: registerData.userType,
      isNewUser: true
    });

    setIsLoading(false);
  };

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <PawPrint className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">PetConnect</h1>
          </div>
          <p className="text-gray-600">Connect pets with loving families</p>
        </div>

        <Card className="p-8 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
              <TabsTrigger value="login" className="rounded-lg">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Welcome back!</h2>
                <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="pl-10 rounded-xl"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="pl-10 pr-10 rounded-xl"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl h-12"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                <p>Demo credentials:</p>
                <p>Admin: admin@petconnect.com / any password</p>
                <p>User: any email / any password</p>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Create account</h2>
                <p className="text-gray-600 text-sm mt-1">Join our pet-loving community</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      required
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className="pl-10 rounded-xl"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="pl-10 rounded-xl"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                

                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="pl-10 rounded-xl"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-confirm">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-confirm"
                      name="confirmPassword"
                      type="password"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="pl-10 rounded-xl"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl h-12"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

/* PropTypes mirror for the original TypeScript props */
Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

Login.defaultProps = {
  // no default for onLogin — it's required
};

