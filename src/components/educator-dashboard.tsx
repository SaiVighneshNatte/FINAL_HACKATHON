import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface EducatorDashboardProps {
  onLogout: () => void;
}

const myContent = [
  { id: 1, title: 'Fundamental Rights Explained', type: 'Article', status: 'Published', views: 1247, likes: 89 },
  { id: 2, title: 'Preamble Interactive Session', type: 'Live Session', status: 'Scheduled', attendees: 45, date: 'Today 3:00 PM' },
  { id: 3, title: 'Article 356 - President\'s Rule', type: 'Article', status: 'Draft', views: 0, likes: 0 }
];

const analytics = {
  totalViews: 5430,
  totalLikes: 342,
  activeLearners: 156,
  completedSessions: 23
};

const upcomingSessions = [
  { id: 1, title: 'Constitutional Amendments Workshop', date: 'Dec 25, 2024', time: '2:00 PM', attendees: 67 },
  { id: 2, title: 'Directive Principles Deep Dive', date: 'Dec 26, 2024', time: '4:00 PM', attendees: 34 },
  { id: 3, title: 'Rights vs Duties Discussion', date: 'Dec 27, 2024', time: '6:00 PM', attendees: 28 }
];

export function EducatorDashboard({ onLogout }: EducatorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF9933] rounded-full flex items-center justify-center">
                <span className="text-white">👨‍🏫</span>
              </div>
              <div>
                <h1 className="text-lg text-[#000080]">Educator Portal</h1>
                <p className="text-sm text-gray-600">Create & Teach</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-gray-600">
              Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-[#138808]/10 to-[#138808]/5">
                <div className="p-4 text-center">
                  <div className="text-2xl text-[#138808] mb-1">{analytics.totalViews.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Views</div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5">
                <div className="p-4 text-center">
                  <div className="text-2xl text-[#FF9933] mb-1">{analytics.activeLearners}</div>
                  <div className="text-xs text-gray-600">Active Learners</div>
                </div>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">📊 This Week's Impact</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Engagement</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Session Attendance</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 bg-[#138808] hover:bg-[#138808]/90 flex flex-col gap-2">
                <span className="text-xl">✍️</span>
                <span className="text-sm">Create Article</span>
              </Button>
              <Button className="h-20 bg-[#FF9933] hover:bg-[#FF9933]/90 flex flex-col gap-2">
                <span className="text-xl">🎥</span>
                <span className="text-sm">Start Session</span>
              </Button>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">🔥 Recent Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>New comment on "Fundamental Rights"</span>
                    <span className="text-gray-500">2h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session completed successfully</span>
                    <span className="text-gray-500">5h ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Article approved by admin</span>
                    <span className="text-gray-500">1d ago</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">My Content</h2>
              <Button size="sm" className="bg-[#138808] hover:bg-[#138808]/90">
                Create New
              </Button>
            </div>

            {myContent.map((content) => (
              <Card key={content.id} className="border-l-4 border-l-[#FF9933]">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-[#000080] mb-1">{content.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                    </div>
                    <Badge 
                      className={
                        content.status === 'Published' ? 'bg-[#138808]' :
                        content.status === 'Scheduled' ? 'bg-[#FF9933]' : 'bg-gray-500'
                      }
                    >
                      {content.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    {content.status === 'Scheduled' ? (
                      <span>{content.date}</span>
                    ) : (
                      <span>{content.views} views • {content.likes} likes</span>
                    )}
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[#FF9933]">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="bg-blue-50 border-blue-200">
              <div className="p-4 text-center">
                <h3 className="text-[#000080] mb-2">📝 Content Tips</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Use simple language and examples to explain complex constitutional concepts
                </p>
                <Button size="sm" variant="outline" className="border-[#000080] text-[#000080]">
                  View Guidelines
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Live Sessions</h2>
              <Button size="sm" className="bg-[#FF9933] hover:bg-[#FF9933]/90">
                Schedule New
              </Button>
            </div>

            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-[#000080] mb-1">{session.title}</h3>
                      <p className="text-xs text-gray-600">{session.date} at {session.time}</p>
                    </div>
                    <Badge className="bg-[#138808]">
                      {session.attendees} registered
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1 border-[#FF9933] text-[#FF9933]">
                      Edit
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#138808] hover:bg-[#138808]/90">
                      Start
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10">
              <div className="p-4 text-center">
                <h3 className="text-[#000080] mb-2">🎯 Session Success</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your last session had 95% attendance and 4.8/5 rating!
                </p>
                <Button size="sm" variant="outline" className="border-[#138808] text-[#138808]">
                  View Feedback
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="grid grid-cols-4 gap-1">
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>📊</span>
              <span className="text-xs">Analytics</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>📝</span>
              <span className="text-xs">Content</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>🎥</span>
              <span className="text-xs">Sessions</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>👤</span>
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}