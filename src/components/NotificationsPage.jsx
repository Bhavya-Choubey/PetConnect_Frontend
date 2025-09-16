import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Bell, Check, Trash2, Filter, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationsPage({
  onBack,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  userRole
}) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => !!n.read).length;

  const handleMarkAllRead = () => {
    onMarkAllAsRead();
    toast.success('All notifications marked as read');
  };

  // Simplified stats
  const overviewStats = [
    { label: 'Total', value: notifications.length, color: 'bg-blue-50 text-blue-600' },
    { label: 'Read', value: readCount, color: 'bg-green-50 text-green-600' },
    { label: 'Unread', value: unreadCount, color: 'bg-red-50 text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-white/50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Bell className="h-8 w-8 mr-3 text-blue-500" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-3 bg-red-500 text-white">{unreadCount} new</Badge>
                )}
              </h1>
              <p className="text-gray-600">Stay updated with the latest activity</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button onClick={handleMarkAllRead} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        {/* Stats */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-6 w-6 mr-2 text-blue-500" />
              Notification Overview
            </CardTitle>
            <CardDescription>Your notification activity summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {overviewStats.map((stat, index) => (
                <div key={index} className={`text-center p-4 rounded-lg ${stat.color}`}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-0 shadow-lg transition-all duration-200 ${
                  !notification.read ? 'bg-white border-l-4 border-l-blue-500' : 'bg-gray-50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            !notification.read ? 'bg-blue-100' : 'bg-gray-200'
                          }`}
                        >
                          {notification.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`font-semibold ${
                              !notification.read ? 'text-gray-900' : 'text-gray-600'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>

                        <p className={`${!notification.read ? 'text-gray-700' : 'text-gray-500'} mb-3`}>
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Exact timestamp */}
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(notification.timestamp).toLocaleString()}
                          </div>

                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <Bell className="h-24 w-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No notifications yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                When you have new updates, they'll appear here.
              </p>
              <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
                Explore Platform
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

/* PropTypes */
NotificationsPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string,
      message: PropTypes.string,
      timestamp: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
      read: PropTypes.bool,
      icon: PropTypes.node
    })
  ).isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onMarkAllAsRead: PropTypes.func.isRequired,
  userRole: PropTypes.oneOf(['buyer', 'seller', 'admin']).isRequired
};

NotificationsPage.defaultProps = {
  notifications: []
};
