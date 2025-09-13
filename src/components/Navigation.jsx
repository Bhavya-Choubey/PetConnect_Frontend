import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Heart,
  User,
  PawPrint,
  LogOut,
  UserCircle,
  Bell,
  MessageSquare,
  Clock,
  History,
  Settings,
  Flag,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export default function Navigation({
  user,
  currentView,
  onViewChange,
  onHomeClick,
  onLogout,
  onNavigationClick,
  onNotificationClick,
  unreadNotifications = 0, // default for unreadNotifications
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Notifications (mock for dropdown)
  const [notifications] = useState([
    {
      id: "1",
      type: "reply",
      message: "Sarah replied to your inquiry about Buddy",
      time: "2 hours ago",
      read: false,
      petName: "Buddy",
    },
    {
      id: "2",
      type: "adoption",
      message: "Your adoption request for Whiskers was approved!",
      time: "1 day ago",
      read: false,
      petName: "Whiskers",
    },
    {
      id: "3",
      type: "message",
      message: "Mike sent you a message about Princess",
      time: "3 days ago",
      read: true,
      petName: "Princess",
    },
  ]);

  // Report dialog state + form
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    const trimmed = (reportText || "").trim();
    if (!trimmed) return;

    setIsSubmittingReport(true);

    try {
      // Replace with your real API endpoint. This is a mock POST.
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id ?? null,
          userEmail: user?.email ?? null,
          message: trimmed,
          timestamp: new Date().toISOString(),
        }),
      });

      // Simple UX: clear & close
      setReportText("");
      setIsReportOpen(false);
      // Optionally show a toast or other feedback
    } catch (err) {
      console.error("Failed to submit report:", err);
      // Optionally show error feedback to the user
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const unreadCount = unreadNotifications;

  // Guard in case `user` is missing; don't throw.
  const role = user?.role ?? "buyer";

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <PawPrint className="h-8 w-8 text-green-500" />
            <span className="text-xl font-semibold text-gray-800">PetConnect</span>
          </button>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {role !== "admin" && (
                <>
                  <Button
                    variant={currentView === "buyer" ? "default" : "ghost"}
                    onClick={() => onViewChange("buyer")}
                    className="flex items-center space-x-2 rounded-xl"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Find Pets</span>
                  </Button>

                  <Button
                    variant={currentView === "seller" ? "default" : "ghost"}
                    onClick={() => onViewChange("seller")}
                    className="flex items-center space-x-2 rounded-xl"
                  >
                    <User className="h-4 w-4" />
                    <span>My Listings</span>
                  </Button>
                </>
              )}

              {role === "admin" && (
                <Button
                  variant={currentView === "admin" ? "default" : "ghost"}
                  onClick={() => onViewChange("admin")}
                  className="flex items-center space-x-2 rounded-xl"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                  onClick={onNotificationClick}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-white">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-0 rounded-xl" align="end">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="text-sm text-gray-500">{unreadCount} unread messages</p>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      // optionally call a handler when clicking a notification
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "reply"
                              ? "bg-blue-100"
                              : notification.type === "adoption"
                              ? "bg-green-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {notification.type === "reply" ? (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          ) : notification.type === "adoption" ? (
                            <Heart className="h-4 w-4 text-green-600" />
                          ) : (
                            <MessageSquare className="h-4 w-4 text-gray-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>

                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <Button variant="ghost" className="w-full text-sm" onClick={onNotificationClick}>
                    View All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Avatar & Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name || user?.email} />
                    <AvatarFallback>
                      {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center space-x-2">
                    <PawPrint className="h-6 w-6 text-green-500" />
                    <span>Menu</span>
                  </SheetTitle>
                  <SheetDescription>Access your account and app features</SheetDescription>
                </SheetHeader>

                {/* User Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar} alt={user?.name || user?.email} />
                      <AvatarFallback>
                        {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile navigation links */}
                <div className="mt-6 space-y-2 md:hidden">
                  <h4 className="text-sm font-semibold text-gray-500 px-3 mb-2">Navigation</h4>

                  {role !== "admin" && (
                    <>
                      <Button
                        variant={currentView === "buyer" ? "default" : "ghost"}
                        onClick={() => {
                          onViewChange("buyer");
                          setIsSheetOpen(false);
                        }}
                        className="w-full justify-start rounded-xl"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Find Pets
                      </Button>

                      <Button
                        variant={currentView === "seller" ? "default" : "ghost"}
                        onClick={() => {
                          onViewChange("seller");
                          setIsSheetOpen(false);
                        }}
                        className="w-full justify-start rounded-xl"
                      >
                        <User className="h-4 w-4 mr-3" />
                        My Listings
                      </Button>
                    </>
                  )}

                  {role === "admin" && (
                    <Button
                      variant={currentView === "admin" ? "default" : "ghost"}
                      onClick={() => {
                        onViewChange("admin");
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start rounded-xl"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Admin Dashboard
                    </Button>
                  )}
                </div>

                {/* Account menu (users only) */}
                {role !== "admin" && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-sm font-semibold text-gray-500 px-3 mb-2">Account</h4>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigationClick("profile");
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start rounded-xl hover:bg-gray-50"
                    >
                      <UserCircle className="h-4 w-4 mr-3" />
                      View/Edit Profile
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigationClick("wishlists");
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start rounded-xl hover:bg-gray-50"
                    >
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlists
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigationClick("history");
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start rounded-xl hover:bg-gray-50"
                    >
                      <History className="h-4 w-4 mr-3" />
                      History
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigationClick("contact");
                        setIsSheetOpen(false);
                      }}
                      className="w-full justify-start rounded-xl hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4 mr-3" />
                      Contact Us
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setIsReportOpen(true)}
                      className="w-full justify-start rounded-xl hover:bg-gray-50 text-red-600"
                    >
                      <Flag className="h-4 w-4 mr-3" />
                      Report a Problem
                    </Button>
                  </div>
                )}

                {/* Report Dialog */}
                <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Report a Problem</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmitReport} className="space-y-4">
                      <Textarea
                        placeholder="Describe the problem..."
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        required
                      />

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsReportOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmittingReport}>
                          {isSubmittingReport ? "Sending..." : "Send Report"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Logout */}
                <div className="mt-8 pt-6 border-t">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onLogout();
                      setIsSheetOpen(false);
                    }}
                    className="w-full justify-start rounded-xl text-red-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* PropTypes to mirror original TypeScript interfaces */
const UserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.oneOf(["buyer", "seller", "admin"]).isRequired,
  name: PropTypes.string,
  avatar: PropTypes.string,
});

Navigation.propTypes = {
  user: UserPropType.isRequired,
  currentView: PropTypes.oneOf(["buyer", "seller", "admin"]).isRequired,
  onViewChange: PropTypes.func.isRequired,
  onHomeClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigationClick: PropTypes.func.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
  unreadNotifications: PropTypes.number,
};
