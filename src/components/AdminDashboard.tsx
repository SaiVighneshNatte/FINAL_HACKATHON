import React, { useState } from 'react';
import { Users, FileText, CheckCircle, AlertCircle, TrendingUp, Search, Filter } from 'lucide-react';
import { Screen } from '../App';

interface AdminDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'content'>('overview');

  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: Users, color: '#000080' },
    { label: 'Pending Content', value: '23', change: '-5%', icon: FileText, color: '#FF9933' },
    { label: 'Active Sessions', value: '47', change: '+8%', icon: TrendingUp, color: '#138808' },
    { label: 'Reports', value: '8', change: '+2%', icon: AlertCircle, color: '#FF9933' }
  ];

  const pendingContent = [
    {
      id: 1,
      title: 'Understanding Judicial Review',
      author: 'Dr. Sharma',
      type: 'Article',
      submittedDate: '2025-11-28',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Constitutional Amendments Quiz',
      author: 'Prof. Verma',
      type: 'Quiz',
      submittedDate: '2025-11-27',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Emergency Provisions Guide',
      author: 'Legal Expert Patel',
      type: 'Article',
      submittedDate: '2025-11-26',
      status: 'pending'
    }
  ];

  const recentUsers = [
    { id: 1, name: 'Rahul Kumar', role: 'Citizen', joined: '2025-11-29', status: 'active' },
    { id: 2, name: 'Priya Sharma', role: 'Educator', joined: '2025-11-28', status: 'active' },
    { id: 3, name: 'Amit Patel', role: 'Citizen', joined: '2025-11-28', status: 'active' },
    { id: 4, name: 'Sneha Reddy', role: 'Legal Expert', joined: '2025-11-27', status: 'pending' }
  ];

  const handleApproveContent = (id: number) => {
    console.log('Approving content:', id);
  };

  const handleRejectContent = (id: number) => {
    console.log('Rejecting content:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-6 text-white">
        <h1 className="mb-2">Admin Dashboard</h1>
        <p className="text-blue-200">Manage platform operations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 flex gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => setSelectedTab('overview')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'overview' 
              ? 'border-b-2 border-blue-900 text-blue-900' 
              : 'text-gray-500'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedTab('users')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'users' 
              ? 'border-b-2 border-blue-900 text-blue-900' 
              : 'text-gray-500'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedTab('content')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'content' 
              ? 'border-b-2 border-blue-900 text-blue-900' 
              : 'text-gray-500'
          }`}
        >
          Content
        </button>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="text-gray-900 mb-1">{stat.value}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">{stat.label}</div>
                      <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pending Approvals */}
            <div>
              <h3 className="mb-3 text-gray-900">Pending Approvals</h3>
              <div className="space-y-3">
                {pendingContent.slice(0, 2).map((content) => (
                  <div
                    key={content.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{content.title}</h4>
                        <p className="text-sm text-gray-500">by {content.author}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {content.type}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => handleApproveContent(content.id)}
                        className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg text-sm transition-all hover:bg-green-700 active:scale-95"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectContent(content.id)}
                        className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 rounded-lg text-sm transition-all hover:bg-gray-300 active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div>
              <h3 className="mb-3 text-gray-900">Recent Users</h3>
              <div className="space-y-2">
                {recentUsers.slice(0, 3).map((user) => (
                  <div
                    key={user.id}
                    className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'users' && (
          <>
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button className="p-3 bg-white rounded-xl border border-gray-200">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">All Users</h3>
              <div className="space-y-2">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.role}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Joined: {user.joined}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'content' && (
          <>
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <button className="p-3 bg-white rounded-xl border border-gray-200">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Pending Content</h3>
              <div className="space-y-3">
                {pendingContent.map((content) => (
                  <div
                    key={content.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{content.title}</h4>
                        <p className="text-sm text-gray-500">by {content.author}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {content.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mb-3">
                      Submitted: {content.submittedDate}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApproveContent(content.id)}
                        className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg text-sm transition-all hover:bg-green-700 active:scale-95"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectContent(content.id)}
                        className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 rounded-lg text-sm transition-all hover:bg-gray-300 active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
