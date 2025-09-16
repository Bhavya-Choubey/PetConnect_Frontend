// import React, { useState, useEffect } from 'react';
// import Landing from './components/Landing';
// import Login from './components/Login';
// import ProfileSetup from './components/ProfileSetup';
// import Navigation from './components/Navigation';
// import Homepage from './components/Homepage';
// import PetProfile from './components/PetProfile';
// import SellerDashboard from './components/SellerDashboard';
// import AdminDashboard from './components/AdminDashboard';
// import ProfilePage from './components/ProfilePage';
// import WishlistPage from './components/WishlistPage';
// import HistoryPage from './components/HistoryPage';
// import ContactPage from './components/ContactPage';
// import NotificationsPage from './components/NotificationsPage';
// import Footer from './components/Footer';
// import AboutPetConnect from './components/AboutPetConnect';
// import { Toaster } from './components/ui/sonner';
// import './styles/globals.css';

// export default function App() {
//   // start at landing so the landing page appears before login
//   const [appState, setAppState] = useState('landing'); // 'landing' | 'login' | 'profile-setup' | 'app'
//   const [user, setUser] = useState(null);
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedPetId, setSelectedPetId] = useState(null);
//   const [wishlistedPets, setWishlistedPets] = useState(new Set());
//   const [viewHistory, setViewHistory] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // called by Landing when user clicks "Let's Get Started"
//   const handleLandingContinue = () => {
//     setAppState('login');
//     if (typeof window !== 'undefined') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleLogin = (userData) => {
//     const newUser = {
//       id: userData.id,
//       email: userData.email,
//       role: userData.role,
//       name: userData.email.split('@')[0], // Default name from email
//     };

//     setUser(newUser);

//     if (userData.isNewUser && userData.role !== 'admin') {
//       setAppState('profile-setup');
//     } else {
//       setAppState('app');
//       // Set initial view based on role
//       if (userData.role === 'admin') {
//         setCurrentView('admin-dashboard');
//       } else {
//         setCurrentView('home');
//       }
//     }
//   };

//   const handleProfileComplete = () => {
//     setAppState('app');
//     if (user?.role === 'admin') {
//       setCurrentView('admin-dashboard');
//     } else {
//       setCurrentView('home');
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setAppState('login');
//     setCurrentView('home');
//     setSelectedPetId(null);
//   };

//   const handleRoleChange = (role) => {
//     if (!user) return;

//     // Navigate to appropriate view based on role
//     switch (role) {
//       case 'buyer':
//         setCurrentView('home');
//         break;
//       case 'seller':
//         setCurrentView('seller-dashboard');
//         break;
//       case 'admin':
//         setCurrentView('admin-dashboard');
//         break;
//       default:
//         break;
//     }

//     setSelectedPetId(null);
//   };

//   const handleHomeClick = () => {
//     if (user?.role === 'admin') {
//       setCurrentView('admin-dashboard');
//     } else {
//       setCurrentView('home');
//     }
//     setSelectedPetId(null);
//   };

//   const handlePetSelect = (petId) => {
//     setSelectedPetId(petId);
//     setCurrentView('pet-profile');

//     // Add to view history if not already the most recent
//     setViewHistory((prev) => {
//       if (prev[0] !== petId) {
//         return [petId, ...prev.filter((id) => id !== petId)];
//       }
//       return prev;
//     });
//   };

//   const handleBackToHome = () => {
//     if (user?.role === 'admin') {
//       setCurrentView('admin-dashboard');
//     } else {
//       setCurrentView('home');
//     }
//     setSelectedPetId(null);
//   };

//   const handleToggleWishlist = (petId) => {
//     setWishlistedPets((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(petId)) {
//         newSet.delete(petId);
//       } else {
//         newSet.add(petId);
//       }
//       return newSet;
//     });
//   };

//   // This is used by Footer via prop to navigate views (e.g. 'seller-dashboard', 'about')
//   const handleNavigationClick = (view) => {
//     setCurrentView(view);
//     setSelectedPetId(null);
//     // scroll to top for a nicer UX when navigating via footer
//     if (typeof window !== 'undefined') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   // Initialize notifications based on user role
//   useEffect(() => {
//     if (user) {
//       const mockNotifications = generateNotificationsForUser(user);
//       setNotifications(mockNotifications);
//       setUnreadCount(mockNotifications.filter((n) => !n.read).length);
//     }
//   }, [user]);

//   const generateNotificationsForUser = (user) => {
//     const baseNotifications = [
//       {
//         id: '1',
//         type: 'new_pet',
//         title: 'New Pet Available',
//         message: 'A beautiful Golden Retriever named "Sunny" is now available for adoption!',
//         timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
//         read: false,
//         icon: '🐕',
//       },
//       {
//         id: '2',
//         type: 'new_pet',
//         title: 'Fresh Listings',
//         message: '3 new cats have been added to the platform today.',
//         timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
//         read: false,
//         icon: '🐱',
//       },
//     ];

//     if (user.role === 'buyer') {
//       return [
//         ...baseNotifications,
//         {
//           id: '3',
//           type: 'wishlist_update',
//           title: 'Wishlist Update',
//           message: 'A pet from your wishlist has updated information.',
//           timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
//           read: true,
//           icon: '💕',
//         },
//         {
//           id: '4',
//           type: 'adoption_tip',
//           title: 'Adoption Tips',
//           message: 'Check out our new guide on preparing your home for a new pet.',
//           timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
//           read: true,
//           icon: '💡',
//         },
//       ];
//     }

//     if (user.role === 'seller') {
//       return [
//         ...baseNotifications,
//         {
//           id: '3',
//           type: 'adoption_request',
//           title: 'New Adoption Request',
//           message: 'Sarah Johnson is interested in adopting your pet "Buddy".',
//           timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
//           read: false,
//           icon: '📝',
//         },
//         {
//           id: '4',
//           type: 'adoption_request',
//           title: 'Adoption Request Update',
//           message: 'Michael Smith has submitted additional information for "Whiskers".',
//           timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
//           read: false,
//           icon: '📋',
//         },
//         {
//           id: '5',
//           type: 'message',
//           title: 'New Message',
//           message: 'You have a new message from a potential adopter.',
//           timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
//           read: true,
//           icon: '💬',
//         },
//       ];
//     }

//     if (user.role === 'admin') {
//       return [
//         ...baseNotifications,
//         {
//           id: '3',
//           type: 'admin_message',
//           title: 'System Update',
//           message: 'Platform maintenance completed successfully. All systems operational.',
//           timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
//           read: false,
//           icon: '⚡',
//         },
//         {
//           id: '4',
//           type: 'admin_message',
//           title: 'New User Report',
//           message: '15 new users registered today. Monthly growth: +12%.',
//           timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
//           read: false,
//           icon: '📈',
//         },
//         {
//           id: '5',
//           type: 'admin_message',
//           title: 'Content Moderation',
//           message: '3 new pet listings are pending approval.',
//           timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
//           read: true,
//           icon: '🔍',
//         },
//       ];
//     }

//     return baseNotifications;
//   };

//   const handleNotificationClick = () => {
//     setCurrentView('notifications');
//     setSelectedPetId(null);
//   };

//   const handleMarkNotificationAsRead = (notificationId) => {
//     setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)));
//     setUnreadCount((prev) => Math.max(0, prev - 1));
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     setUnreadCount(0);
//   };

//   const renderCurrentView = () => {
//     if (!user) return null;

//     switch (currentView) {
//       case 'home':
//         return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;

//       case 'pet-profile':
//         if (!selectedPetId) return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;
//         return <PetProfile petId={selectedPetId} onBack={handleBackToHome} />;

//       case 'seller-dashboard':
//         return <SellerDashboard />;

//       case 'admin-dashboard':
//         return <AdminDashboard />;

//       case 'about':
//         return <AboutPetConnect onBack={handleBackToHome} />;

//       case 'profile':
//         return <ProfilePage user={user} onBack={handleBackToHome} />;

//       case 'wishlists':
//         return <WishlistPage onBack={handleBackToHome} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} onPetSelect={handlePetSelect} />;

//       case 'history':
//         return <HistoryPage onBack={handleBackToHome} viewHistory={viewHistory} onPetSelect={handlePetSelect} />;

//       case 'contact':
//         return <ContactPage onBack={handleBackToHome} />;

//       case 'notifications':
//         return (
//           <NotificationsPage
//             onBack={handleBackToHome}
//             notifications={notifications}
//             onMarkAsRead={handleMarkNotificationAsRead}
//             onMarkAllAsRead={handleMarkAllAsRead}
//             userRole={user.role}
//           />
//         );

//       default:
//         return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;
//     }
//   };

//   // Render based on app state
//   switch (appState) {
//     case 'landing':
//       return <Landing onGetStarted={handleLandingContinue} />;

//     case 'login':
//       return <Login onLogin={handleLogin} />;

      
//     case 'profile-setup':
//       if (!user) return <Login onLogin={handleLogin} />;
//       return <ProfileSetup userRole={user.role} onComplete={handleProfileComplete} />;

//     case 'app':
//       if (!user) return <Login onLogin={handleLogin} />;
//       return (
//         <div className="min-h-screen bg-gray-50">
//           <Navigation
//             user={user}
//             currentView={user.role === 'admin' ? 'admin' : (currentView === 'seller-dashboard' ? 'seller' : 'buyer')}
//             onViewChange={handleRoleChange}
//             onHomeClick={handleHomeClick}
//             onLogout={handleLogout}
//             onNavigationClick={handleNavigationClick}
//             onNotificationClick={handleNotificationClick}
//             unreadNotifications={unreadCount}
//           />
//           <main>
//             {renderCurrentView()}
//           </main>

//           {/* Footer integrated with app navigation */}
//           <Footer onNavigate={handleNavigationClick} />

//           <Toaster position="top-right" />
//         </div>
//       );

//     default:
//       return <Login onLogin={handleLogin} />;
//   }
// }

import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Navigation from './components/Navigation';
import Homepage from './components/Homepage';
import PetProfile from './components/PetProfile';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from './components/ProfilePage';
import WishlistPage from './components/WishlistPage';
import HistoryPage from './components/HistoryPage';
import ContactPage from './components/ContactPage';
import NotificationsPage from './components/NotificationsPage';
import Footer from './components/Footer';
import AboutPetConnect from './components/AboutPetConnect';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

export default function App() {
  // start at landing so the landing page appears before login
  const [appState, setAppState] = useState('landing'); // 'landing' | 'login' | 'profile-setup' | 'app'
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [wishlistedPets, setWishlistedPets] = useState(new Set());
  const [viewHistory, setViewHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // called by Landing when user clicks "Let's Get Started"
  const handleLandingContinue = () => {
    setAppState('login');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (userData) => {
    const newUser = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      name: userData.email.split('@')[0], // Default name from email
    };

    setUser(newUser);

    if (userData.isNewUser && userData.role !== 'admin') {
      setAppState('profile-setup');
    } else {
      setAppState('app');
      // Set initial view based on role
      if (userData.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('home');
      }
    }
  };

  const handleProfileComplete = () => {
    setAppState('app');
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('login');
    setCurrentView('home');
    setSelectedPetId(null);
  };

  const handleRoleChange = (role) => {
    if (!user) return;

    // Navigate to appropriate view based on role
    switch (role) {
      case 'buyer':
        setCurrentView('home');
        break;
      case 'seller':
        setCurrentView('seller-dashboard');
        break;
      case 'admin':
        setCurrentView('admin-dashboard');
        break;
      default:
        break;
    }

    setSelectedPetId(null);
  };

  const handleHomeClick = () => {
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('home');
    }
    setSelectedPetId(null);
  };

  const handlePetSelect = (petId) => {
    setSelectedPetId(petId);
    setCurrentView('pet-profile');

    // Add to view history if not already the most recent
    setViewHistory((prev) => {
      if (prev[0] !== petId) {
        return [petId, ...prev.filter((id) => id !== petId)];
      }
      return prev;
    });
  };

  const handleBackToHome = () => {
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('home');
    }
    setSelectedPetId(null);
  };

  const handleToggleWishlist = (petId) => {
    setWishlistedPets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(petId)) {
        newSet.delete(petId);
      } else {
        newSet.add(petId);
      }
      return newSet;
    });
  };

  // This is used by Footer via prop to navigate views (e.g. 'seller-dashboard', 'about')
  const handleNavigationClick = (view) => {
    setCurrentView(view);
    setSelectedPetId(null);
    // scroll to top for a nicer UX when navigating via footer
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Initialize notifications based on user role
  useEffect(() => {
    if (user) {
      const mockNotifications = generateNotificationsForUser(user);
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter((n) => !n.read).length);
    }
  }, [user]);

  const generateNotificationsForUser = (user) => {
    const baseNotifications = [
      {
        id: '1',
        type: 'new_pet',
        title: 'New Pet Available',
        message: 'A beautiful Golden Retriever named "Sunny" is now available for adoption!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        icon: '🐕',
      },
      {
        id: '2',
        type: 'new_pet',
        title: 'Fresh Listings',
        message: '3 new cats have been added to the platform today.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        icon: '🐱',
      },
    ];

    if (user.role === 'buyer') {
      return [
        ...baseNotifications,
        {
          id: '3',
          type: 'wishlist_update',
          title: 'Wishlist Update',
          message: 'A pet from your wishlist has updated information.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          read: true,
          icon: '💕',
        },
        {
          id: '4',
          type: 'adoption_tip',
          title: 'Adoption Tips',
          message: 'Check out our new guide on preparing your home for a new pet.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          icon: '💡',
        },
      ];
    }

    if (user.role === 'seller') {
      return [
        ...baseNotifications,
        {
          id: '3',
          type: 'adoption_request',
          title: 'New Adoption Request',
          message: 'Sarah Johnson is interested in adopting your pet "Buddy".',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
          read: false,
          icon: '📝',
        },
        {
          id: '4',
          type: 'adoption_request',
          title: 'Adoption Request Update',
          message: 'Michael Smith has submitted additional information for "Whiskers".',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          read: false,
          icon: '📋',
        },
        {
          id: '5',
          type: 'message',
          title: 'New Message',
          message: 'You have a new message from a potential adopter.',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          read: true,
          icon: '💬',
        },
      ];
    }

    if (user.role === 'admin') {
      return [
        ...baseNotifications,
        {
          id: '3',
          type: 'admin_message',
          title: 'System Update',
          message: 'Platform maintenance completed successfully. All systems operational.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          read: false,
          icon: '⚡',
        },
        {
          id: '4',
          type: 'admin_message',
          title: 'New User Report',
          message: '15 new users registered today. Monthly growth: +12%.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          read: false,
          icon: '📈',
        },
        {
          id: '5',
          type: 'admin_message',
          title: 'Content Moderation',
          message: '3 new pet listings are pending approval.',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          read: true,
          icon: '🔍',
        },
      ];
    }

    return baseNotifications;
  };

  const handleNotificationClick = () => {
    setCurrentView('notifications');
    setSelectedPetId(null);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const renderCurrentView = () => {
    if (!user) return null;

    switch (currentView) {
      case 'home':
        return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;

      case 'pet-profile':
        if (!selectedPetId) return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;
        return <PetProfile petId={selectedPetId} onBack={handleBackToHome} />;

      case 'seller-dashboard':
        return <SellerDashboard />;

      case 'admin-dashboard':
        return <AdminDashboard />;

      case 'about':
        return <AboutPetConnect onBack={handleBackToHome} />;

      case 'profile':
        return <ProfilePage user={user} onBack={handleBackToHome} />;

      case 'wishlists':
        return <WishlistPage onBack={handleBackToHome} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} onPetSelect={handlePetSelect} />;

      case 'history':
        return <HistoryPage onBack={handleBackToHome} viewHistory={viewHistory} onPetSelect={handlePetSelect} />;

      case 'contact':
        return <ContactPage onBack={handleBackToHome} />;

      case 'notifications':
        return (
          <NotificationsPage
            onBack={handleBackToHome}
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            userRole={user.role}
          />
        );

      default:
        return <Homepage onPetSelect={handlePetSelect} wishlistedPets={wishlistedPets} onToggleWishlist={handleToggleWishlist} />;
    }
  };

  // Render based on app state
  switch (appState) {
    case 'landing':
      return <Landing onGetStarted={handleLandingContinue} />;

    case 'login':
      // <- Login receives onBack prop now (consistent with Login.jsx)
      return <Login onLogin={handleLogin} onBack={() => setAppState('landing')} />;

    case 'profile-setup':
      if (!user) return <Login onLogin={handleLogin} onBack={() => setAppState('landing')} />;
      return <ProfileSetup userRole={user.role} onComplete={handleProfileComplete} />;

    case 'app':
      if (!user) return <Login onLogin={handleLogin} onBack={() => setAppState('landing')} />;
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation
            user={user}
            currentView={user.role === 'admin' ? 'admin' : (currentView === 'seller-dashboard' ? 'seller' : 'buyer')}
            onViewChange={handleRoleChange}
            onHomeClick={handleHomeClick}
            onLogout={handleLogout}
            onNavigationClick={handleNavigationClick}
            onNotificationClick={handleNotificationClick}
            unreadNotifications={unreadCount}
          />
          <main>
            {renderCurrentView()}
          </main>

          {/* Footer integrated with app navigation */}
          <Footer onNavigate={handleNavigationClick} />

          <Toaster position="top-right" />
        </div>
      );

    default:
      return <Login onLogin={handleLogin} onBack={() => setAppState('landing')} />;
  }
}
