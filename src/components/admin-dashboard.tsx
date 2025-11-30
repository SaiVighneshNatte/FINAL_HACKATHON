import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface AdminDashboardProps {
  onLogout: () => void;
}

const pendingApprovals = [
  { id: 1, title: 'Article 19 - Freedom of Speech', author: 'Dr. Kumar', type: 'Article', submitted: '2 hours ago' },
  { id: 2, title: 'Constitutional Amendments Quiz', author: 'Prof. Singh', type: 'Quiz', submitted: '5 hours ago' },
  { id: 3, title: 'Judicial Review Session', author: 'Adv. Sharma', type: 'Session', submitted: '1 day ago' }
];

const systemStats = {
  totalUsers: 12847,
  activeToday: 1256,
  contentApproved: 89,
  pendingReports: 3
};

const userActivity = [
  { id: 1, user: 'citizen_ram_123', action: 'Completed Fundamental Rights Quiz', time: '5 min ago', score: '85%' },
  { id: 2, user: 'educator_priya', action: 'Created new article', time: '15 min ago', status: 'Pending approval' },
  { id: 3, user: 'expert_legal_adv', action: 'Answered Q&A question', time: '30 min ago', topic: 'Article 356' },
  { id: 4, user: 'citizen_amit_567', action: 'Started discussion thread', time: '1 hour ago', replies: '8 replies' }
];

const reportedContent = [
  { id: 1, content: 'Comment on "Article 21 Discussion"', reason: 'Inappropriate language', reporter: 'citizen_123', status: 'Under review' },
  { id: 2, content: 'Quiz question accuracy dispute', reason: 'Factual error', reporter: 'educator_456', status: 'Under review' },
  { id: 3, content: 'Forum post spam', reason: 'Spam content', reporter: 'citizen_789', status: 'Resolved' }
];

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#000080] rounded-full flex items-center justify-center">
                <span className="text-white">⚙️</span>
              </div>
              <div>
                <h1 className="text-lg text-[#000080]">Admin Panel</h1>
                <p className="text-sm text-gray-600">System Management</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onLogout} className="text-gray-600">
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 text-xs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* System Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-[#138808]/10 to-[#138808]/5">
                <div className="p-4 text-center">
                  <div className="text-xl text-[#138808] mb-1">{systemStats.totalUsers.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Total Users</div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-[#FF9933]/10 to-[#FF9933]/5">
                <div className="p-4 text-center">
                  <div className="text-xl text-[#FF9933] mb-1">{systemStats.activeToday.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Active Today</div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-16 bg-[#000080] hover:bg-[#000080]/90 flex flex-col gap-1">
                <span className="text-lg">👥</span>
                <span className="text-xs">Manage Users</span>
              </Button>
              <Button className="h-16 bg-[#FF9933] hover:bg-[#FF9933]/90 flex flex-col gap-1">
                <span className="text-lg">📋</span>
                <span className="text-xs">Content Queue</span>
              </Button>
            </div>

            {/* Pending Approvals */}
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#000080]">⏳ Pending Approvals</h3>
                  <Badge className="bg-[#FF9933]">{pendingApprovals.length}</Badge>
                </div>
                <div className="space-y-2">
                  {pendingApprovals.slice(0, 2).map((item) => (
                    <div key={item.id} className="border-l-4 border-l-[#FF9933] pl-3 py-2">
                      <div className="text-sm text-gray-800">{item.title}</div>
                      <div className="text-xs text-gray-600">by {item.author} • {item.submitted}</div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-[#000080]">
                    View All ({pendingApprovals.length})
                  </Button>
                </div>
              </div>
            </Card>

            {/* System Health */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">🔧 System Health</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Server Performance</span>
                      <span className="text-[#138808]">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Moderation</span>
                      <span className="text-[#FF9933]">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">User Management</h2>
              <Button size="sm" variant="outline" className="border-[#000080] text-[#000080]">
                Export Data
              </Button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-4 gap-2">
              <Card className="p-3 text-center">
                <div className="text-lg text-[#138808]">8.2k</div>
                <div className="text-xs text-gray-600">Citizens</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg text-[#FF9933]">245</div>
                <div className="text-xs text-gray-600">Educators</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg text-purple-600">87</div>
                <div className="text-xs text-gray-600">Experts</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-lg text-[#000080]">12</div>
                <div className="text-xs text-gray-600">Admins</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">📊 Recent Activity</h3>
                <div className="space-y-3">
                  {userActivity.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <div className="text-sm text-gray-800">{activity.action}</div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{activity.user}</span>
                        <span>{activity.time}</span>
                      </div>
                      {activity.score && (
                        <Badge size="sm" className="mt-1 bg-[#138808]">{activity.score}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Content Management</h2>
              <Badge className="bg-[#FF9933]">{pendingApprovals.length} pending</Badge>
            </div>

            {pendingApprovals.map((item) => (
              <Card key={item.id}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-[#000080] mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600">by {item.author} • {item.submitted}</p>
                    </div>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1 border-red-500 text-red-500">
                      Reject
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#138808] hover:bg-[#138808]/90">
                      Approve
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="bg-green-50 border-green-200">
              <div className="p-4 text-center">
                <h3 className="text-[#138808] mb-2">✅ Content Quality</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {systemStats.contentApproved}% of content meets quality standards
                </p>
                <Button size="sm" variant="outline" className="border-[#138808] text-[#138808]">
                  View Guidelines
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Content Reports</h2>
              <Badge className="bg-red-500">{systemStats.pendingReports} urgent</Badge>
            </div>

            {reportedContent.map((report) => (
              <Card key={report.id} className={`border-l-4 ${
                report.status === 'Under review' ? 'border-l-red-500' : 'border-l-green-500'
              }`}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-gray-800 mb-1">{report.content}</h3>
                      <p className="text-xs text-gray-600">Reason: {report.reason}</p>
                      <p className="text-xs text-gray-600">Reported by: {report.reporter}</p>
                    </div>
                    <Badge className={
                      report.status === 'Under review' ? 'bg-red-500' : 'bg-green-500'
                    }>
                      {report.status}
                    </Badge>
                  </div>
                  {report.status === 'Under review' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-500">
                        Dismiss
                      </Button>
                      <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-500/90">
                        Take Action
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            <Card className="bg-blue-50 border-blue-200">
              <div className="p-4 text-center">
                <h3 className="text-[#000080] mb-2">🛡️ Content Moderation</h3>
                <p className="text-sm text-gray-600 mb-3">
                  AI-powered content filtering catches 95% of violations automatically
                </p>
                <Button size="sm" variant="outline" className="border-[#000080] text-[#000080]">
                  Moderation Settings
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
              <span className="text-xs">Dashboard</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>👥</span>
              <span className="text-xs">Users</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>📝</span>
              <span className="text-xs">Content</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>⚙️</span>
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}