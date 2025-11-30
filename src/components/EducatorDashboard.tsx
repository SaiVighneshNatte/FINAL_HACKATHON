import React, { useState } from 'react';
import { BookOpen, Video, Users, BarChart3, Plus, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EducatorDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export const EducatorDashboard: React.FC<EducatorDashboardProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'content' | 'sessions'>('overview');

  const stats = [
    { label: 'Active Students', value: '248', icon: Users, color: '#FF9933' },
    { label: 'Content Created', value: '42', icon: BookOpen, color: '#138808' },
    { label: 'Live Sessions', value: '12', icon: Video, color: '#000080' },
    { label: 'Avg. Score', value: '78%', icon: BarChart3, color: '#FF9933' }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Fundamental Rights Deep Dive',
      date: 'Nov 30, 2025',
      time: '10:00 AM',
      students: 45,
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Constitutional Amendments',
      date: 'Dec 2, 2025',
      time: '2:00 PM',
      students: 38,
      status: 'scheduled'
    }
  ];

  const recentContent = [
    {
      id: 1,
      title: 'Understanding Article 21',
      type: 'Article',
      views: 1250,
      likes: 89,
      status: 'published'
    },
    {
      id: 2,
      title: 'Directive Principles Quiz',
      type: 'Quiz',
      views: 845,
      likes: 67,
      status: 'published'
    },
    {
      id: 3,
      title: 'Emergency Provisions',
      type: 'Article',
      views: 0,
      likes: 0,
      status: 'draft'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-6 text-white">
        <h1 className="mb-2">Educator Dashboard</h1>
        <p className="text-green-100">Welcome back, Professor!</p>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 flex gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => setSelectedTab('overview')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'overview' 
              ? 'border-b-2 border-green-600 text-green-600' 
              : 'text-gray-500'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedTab('content')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'content' 
              ? 'border-b-2 border-green-600 text-green-600' 
              : 'text-gray-500'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setSelectedTab('sessions')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'sessions' 
              ? 'border-b-2 border-green-600 text-green-600' 
              : 'text-gray-500'
          }`}
        >
          Sessions
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
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="mb-3 text-gray-900">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-700 active:scale-98">
                  <Plus className="w-5 h-5" />
                  Create New Content
                </button>
                <button className="w-full bg-white text-green-600 border-2 border-green-600 p-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-50 active:scale-98">
                  <Video className="w-5 h-5" />
                  Start Live Session
                </button>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div>
              <h3 className="mb-3 text-gray-900">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <h4 className="text-gray-900 mb-2">{session.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{session.students} students enrolled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'content' && (
          <>
            <button className="w-full bg-green-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-700 active:scale-98">
              <Plus className="w-5 h-5" />
              Create New Content
            </button>

            <div>
              <h3 className="mb-3 text-gray-900">Recent Content</h3>
              <div className="space-y-3">
                {recentContent.map((content) => (
                  <div
                    key={content.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{content.title}</h4>
                        <span className="text-sm text-gray-500">{content.type}</span>
                      </div>
                      <span 
                        className={`text-xs px-2 py-1 rounded ${
                          content.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {content.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{content.views.toLocaleString()} views</span>
                      <span>{content.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'sessions' && (
          <>
            <button className="w-full bg-green-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-700 active:scale-98">
              <Plus className="w-5 h-5" />
              Schedule New Session
            </button>

            <div>
              <h3 className="mb-3 text-gray-900">All Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <button
                    key={session.id}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left transition-all hover:shadow-md active:scale-98"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-2">{session.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {session.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{session.students} students</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
