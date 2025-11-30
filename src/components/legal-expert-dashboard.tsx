import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface LegalExpertDashboardProps {
  onLogout: () => void;
}

const pendingQuestions = [
  { id: 1, question: 'Can Article 370 be restored after its abrogation?', user: 'citizen_raj', category: 'Constitutional Law', urgency: 'High', time: '2 hours ago' },
  { id: 2, question: 'What is the difference between Article 32 and Article 226?', user: 'student_priya', category: 'Fundamental Rights', urgency: 'Medium', time: '5 hours ago' },
  { id: 3, question: 'How does the 103rd Amendment affect reservation policies?', user: 'educator_kumar', category: 'Amendments', urgency: 'High', time: '1 day ago' }
];

const myContributions = [
  { id: 1, title: 'Article 21 - Right to Life and Personal Liberty', type: 'Content Update', status: 'Published', views: 2456, lastEdited: '3 days ago' },
  { id: 2, title: 'Constitutional Validity of Aadhar Act', type: 'Legal Analysis', status: 'Under Review', views: 0, lastEdited: '1 day ago' },
  { id: 3, title: 'Judicial Review vs Legislative Supremacy', type: 'Article', status: 'Draft', views: 0, lastEdited: 'Today' }
];

const expertStats = {
  questionsAnswered: 127,
  contentUpdated: 23,
  helpfulVotes: 456,
  expertsRating: 4.8
};

const recentActivity = [
  { id: 1, action: 'Answered question about Article 15', votes: 12, time: '30 min ago' },
  { id: 2, action: 'Updated content on Directive Principles', status: 'approved', time: '2 hours ago' },
  { id: 3, action: 'Provided guidance on Writ Jurisdiction', votes: 8, time: '5 hours ago' },
  { id: 4, action: 'Reviewed constitutional amendment proposal', status: 'feedback given', time: '1 day ago' }
];

export function LegalExpertDashboard({ onLogout }: LegalExpertDashboardProps) {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white">⚖️</span>
              </div>
              <div>
                <h1 className="text-lg text-[#000080]">Legal Expert Portal</h1>
                <p className="text-sm text-gray-600">Constitutional Guidance</p>
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
            <TabsTrigger value="questions">Q&A</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Pending Questions</h2>
              <Badge className="bg-purple-600">{pendingQuestions.length} urgent</Badge>
            </div>

            {pendingQuestions.map((item) => (
              <Card key={item.id} className={`border-l-4 ${
                item.urgency === 'High' ? 'border-l-red-500' : 'border-l-[#FF9933]'
              }`}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-[#000080] mb-1">{item.question}</h3>
                      <div className="flex gap-2 text-xs text-gray-600">
                        <span>by {item.user}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <Badge 
                      className={
                        item.urgency === 'High' ? 'bg-red-500' : 'bg-[#FF9933]'
                      }
                    >
                      {item.urgency}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-600/90">
                      Answer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Expert Stats */}
            <Card className="bg-gradient-to-r from-purple-600/10 to-[#000080]/10">
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">📊 Your Impact</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="text-lg text-purple-600">{expertStats.questionsAnswered}</div>
                    <div className="text-xs text-gray-600">Questions Answered</div>
                  </div>
                  <div>
                    <div className="text-lg text-[#138808]">{expertStats.helpfulVotes}</div>
                    <div className="text-xs text-gray-600">Helpful Votes</div>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[#FF9933]">⭐</span>
                    <span className="text-sm">{expertStats.expertsRating}/5.0 Rating</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-16 bg-[#138808] hover:bg-[#138808]/90 flex flex-col gap-1">
                <span className="text-lg">💬</span>
                <span className="text-xs">Live Q&A</span>
              </Button>
              <Button className="h-16 bg-[#FF9933] hover:bg-[#FF9933]/90 flex flex-col gap-1">
                <span className="text-lg">📚</span>
                <span className="text-xs">Update Content</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">My Contributions</h2>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-600/90">
                Create New
              </Button>
            </div>

            {myContributions.map((contribution) => (
              <Card key={contribution.id} className="border-l-4 border-l-purple-600">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm text-[#000080] mb-1">{contribution.title}</h3>
                      <Badge variant="outline" className="text-xs mb-2">
                        {contribution.type}
                      </Badge>
                    </div>
                    <Badge 
                      className={
                        contribution.status === 'Published' ? 'bg-[#138808]' :
                        contribution.status === 'Under Review' ? 'bg-[#FF9933]' : 'bg-gray-500'
                      }
                    >
                      {contribution.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      {contribution.status === 'Published' ? 
                        `${contribution.views} views` : 
                        `Last edited: ${contribution.lastEdited}`
                      }
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-purple-600">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Content Guidelines */}
            <Card className="bg-blue-50 border-blue-200">
              <div className="p-4 text-center">
                <h3 className="text-[#000080] mb-2">📖 Content Standards</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Ensure all legal interpretations cite relevant case laws and constitutional provisions
                </p>
                <Button size="sm" variant="outline" className="border-[#000080] text-[#000080]">
                  View Guidelines
                </Button>
              </div>
            </Card>

            {/* Content Performance */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">📈 Content Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy Rating</span>
                      <span className="text-[#138808]">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Engagement</span>
                      <span className="text-[#FF9933]">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Expert Insights</h2>
              <Badge variant="outline">This Week</Badge>
            </div>

            {/* Weekly Stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-gradient-to-br from-[#138808]/10 to-[#138808]/5">
                <div className="p-4 text-center">
                  <div className="text-xl text-[#138808] mb-1">23</div>
                  <div className="text-xs text-gray-600">Questions Answered</div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600/10 to-purple-600/5">
                <div className="p-4 text-center">
                  <div className="text-xl text-purple-600 mb-1">5</div>
                  <div className="text-xs text-gray-600">Content Updates</div>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">🔥 Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                      <div className="text-sm text-gray-800">{activity.action}</div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{activity.time}</span>
                        {activity.votes && (
                          <Badge size="sm" className="bg-[#138808]">
                            {activity.votes} helpful votes
                          </Badge>
                        )}
                        {activity.status && (
                          <Badge size="sm" className="bg-[#FF9933]">
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card>
              <div className="p-4">
                <h3 className="text-[#000080] mb-3">🔥 Trending Legal Topics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Article 370 & 35A</span>
                    <Badge size="sm" className="bg-red-500">Hot</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Right to Privacy</span>
                    <Badge size="sm" className="bg-[#FF9933]">Rising</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">EWS Reservation</span>
                    <Badge size="sm" className="bg-[#138808]">Active</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Expert Recognition */}
            <Card className="bg-gradient-to-r from-[#FF9933]/10 to-purple-600/10">
              <div className="p-4 text-center">
                <h3 className="text-[#000080] mb-2">🏆 Expert of the Month</h3>
                <p className="text-sm text-gray-600 mb-3">
                  You're in the top 5% of constitutional law experts this month!
                </p>
                <Button size="sm" variant="outline" className="border-purple-600 text-purple-600">
                  View Leaderboard
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
              <span>💬</span>
              <span className="text-xs">Q&A</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>📝</span>
              <span className="text-xs">Content</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-12">
              <span>📊</span>
              <span className="text-xs">Insights</span>
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