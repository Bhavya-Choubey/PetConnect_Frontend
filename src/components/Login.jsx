import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PawPrint, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";


/**
 * Login component
 * Props:
 *  - onLogin: function({ id, email, role: 'buyer'|'seller'|'admin', isNewUser })
 *  - onBack: function() -> called when user clicks Back to return to Landing
 */
export default function Login({ onLogin, onBack }) {
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

  // validation state for name
  const [nameError, setNameError] = useState('');

  const LOCAL_USER_KEY = 'petconnect_user'; // unified key used across app

  /* ----------------------
     Login
     ---------------------- */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // manual password length check (show toast)
    if (!loginData.password || loginData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Determine role (demo)
    const isAdmin = loginData.email === 'admin@petconnect.com';
    const role = isAdmin ? 'admin' : 'buyer';

    // Try to find stored user in localStorage
    let storedUser = null;
    try {
      const raw = localStorage.getItem(LOCAL_USER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // use it only if same email
        if (parsed && parsed.email === loginData.email) storedUser = parsed;
      }
    } catch (err) {
      storedUser = null;
    }

    // If no stored user, create a lightweight one from email (no phone)
    if (!storedUser) {
      const derivedName = (loginData.email && loginData.email.split('@')[0]) || 'User';
      storedUser = {
        id: Date.now().toString(),
        name: derivedName,
        email: loginData.email,
        phone: '', // phone unknown until profile setup
        role
      };
      try {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(storedUser));
      } catch (err) {
        console.warn('Could not save user to localStorage', err);
      }
    }

    // Notify parent
    onLogin({
      id: storedUser.id || '1',
      email: storedUser.email,
      role,
      isNewUser: false
    });
    toast.success("Login successful ❤️");


    setIsLoading(false);
  };

  const handleLoginChange = (e) => {
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ----------------------
     Register
     ---------------------- */

  // live validation while typing: only letters and spaces for name
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // allow empty while typing, but block numbers/special chars
      if (value === '' || /^[A-Za-z\s]*$/.test(value)) {
        setRegisterData(prev => ({ ...prev, name: value }));
        setNameError('');
      } else {
        // do not update value with invalid char; show message
        setNameError('Only letters and spaces allowed.');
      }
      return;
    }

    // other fields
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // final check: name must be valid & not empty
    const nameTrimmed = registerData.name.trim();
    if (!/^[A-Za-z\s]+$/.test(nameTrimmed)) {
      setNameError('Name can contain only letters and spaces.');
      return;
    }

    // Password length check with toast
    if (!registerData.password || registerData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Password match check -> toast on mismatch
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Build user object to persist locally (no phone at signup)
    const newUser = {
      id: Date.now().toString(),
      name: nameTrimmed,
      email: registerData.email,
      phone: '', // intentionally empty — moved to ProfileSetup
      role: registerData.userType
    };

    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
    } catch (err) {
      console.warn('Could not save user to localStorage', err);
    }

    onLogin({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      isNewUser: true
    });

    

    setIsLoading(false);
  };

  // helper: is sign-up valid (disable submit if name error or name empty)
  const isSignUpDisabled = () => {
    if (isLoading) return true;
    if (!registerData.name.trim()) return true;
    if (nameError) return true;
    // other required fields: email/password/confirm
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) return true;
    // Ensure minimum length client-side too
    if (registerData.password.length < 8 || registerData.confirmPassword.length < 8) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md hover:bg-pink-100">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6  "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

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

        <Card className="p-8 rounded-2xl border-0 shadow-lg bg-gray-50 backdrop-blur-sm">
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
                      minLength={8}
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
                  {nameError && <p className="text-sm text-red-600 mt-1">{nameError}</p>}
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
                      minLength={8}
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
                      minLength={8}
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="pl-10 rounded-xl"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSignUpDisabled()}
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

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
