import React, { useState } from 'react';
import { MessageSquare, FileText, BookOpen, TrendingUp, Send, Clock } from 'lucide-react';
import { Screen } from '../App';

interface LegalExpertDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export const LegalExpertDashboard: React.FC<LegalExpertDashboardProps> = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState<'questions' | 'content' | 'insights'>('questions');

  const stats = [
    { label: 'Questions Answered', value: '342', icon: MessageSquare, color: '#FF9933' },
    { label: 'Articles Updated', value: '28', icon: FileText, color: '#138808' },
    { label: 'Avg. Response Time', value: '2.5h', icon: Clock, color: '#000080' },
    { label: 'Helpful Votes', value: '1,245', icon: TrendingUp, color: '#FF9933' }
  ];

  const pendingQuestions = [
    {
      id: 1,
      question: 'Can fundamental rights be suspended during a national emergency?',
      askedBy: 'Rahul Kumar',
      category: 'Emergency Provisions',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      question: 'What is the difference between Directive Principles and Fundamental Rights?',
      askedBy: 'Priya Sharma',
      category: 'Fundamental Rights',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      question: 'How does the process of constitutional amendment work?',
      askedBy: 'Amit Patel',
      category: 'Amendments',
      time: '6 hours ago',
      priority: 'medium'
    }
  ];

  const recentAnswers = [
    {
      id: 1,
      question: 'What is the significance of Article 370?',
      answer: 'Article 370 granted special autonomous status to Jammu and Kashmir...',
      votes: 45,
      time: '1 day ago'
    },
    {
      id: 2,
      question: 'Explain the concept of judicial review',
      answer: 'Judicial review is the power of courts to examine the constitutionality...',
      votes: 38,
      time: '2 days ago'
    }
  ];

  const contentUpdates = [
    {
      id: 1,
      title: 'Article 21 - Right to Life',
      type: 'Update',
      description: 'Added recent Supreme Court interpretation',
      date: '2025-11-28'
    },
    {
      id: 2,
      title: 'Emergency Provisions',
      type: 'New Content',
      description: 'Created comprehensive guide',
      date: '2025-11-27'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-6 text-white">
        <h1 className="mb-2">Legal Expert Portal</h1>
        <p className="text-orange-100">Share your expertise</p>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 flex gap-4 border-b border-gray-100 sticky top-0 z-10">
        <button
          onClick={() => setSelectedTab('questions')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'questions' 
              ? 'border-b-2 border-orange-600 text-orange-600' 
              : 'text-gray-500'
          }`}
        >
          Questions
        </button>
        <button
          onClick={() => setSelectedTab('content')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'content' 
              ? 'border-b-2 border-orange-600 text-orange-600' 
              : 'text-gray-500'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setSelectedTab('insights')}
          className={`pb-2 px-1 transition-colors ${
            selectedTab === 'insights' 
              ? 'border-b-2 border-orange-600 text-orange-600' 
              : 'text-gray-500'
          }`}
        >
          Insights
        </button>
      </div>

      <div className="p-6 space-y-6">
        {selectedTab === 'questions' && (
          <>
            {/* Stats */}
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

            {/* Pending Questions */}
            <div>
              <h3 className="mb-3 text-gray-900">Pending Questions</h3>
              <div className="space-y-3">
                {pendingQuestions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900 flex-1">{item.question}</h4>
                      <span 
                        className={`text-xs px-2 py-1 rounded flex-shrink-0 ml-2 ${
                          item.priority === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>Asked by {item.askedBy}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {item.category}
                      </span>
                      <button className="py-2 px-4 bg-orange-600 text-white rounded-lg text-sm flex items-center gap-1 transition-all hover:bg-orange-700 active:scale-95">
                        <Send className="w-4 h-4" />
                        Answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Answers */}
            <div>
              <h3 className="mb-3 text-gray-900">Recent Answers</h3>
              <div className="space-y-3">
                {recentAnswers.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <h4 className="text-gray-900 mb-2">{item.question}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.answer}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{item.time}</span>
                      <div className="flex items-center gap-1 text-orange-600">
                        <TrendingUp className="w-4 h-4" />
                        {item.votes} helpful
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'content' && (
          <>
            <button className="w-full bg-orange-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-orange-700 active:scale-98">
              <FileText className="w-5 h-5" />
              Create New Content
            </button>

            <div>
              <h3 className="mb-3 text-gray-900">Recent Updates</h3>
              <div className="space-y-3">
                {contentUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900">{update.title}</h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {update.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                    <div className="text-xs text-gray-400">{update.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedTab === 'insights' && (
          <>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <h3 className="text-gray-900 mb-2">Your Impact</h3>
              <p className="text-gray-600 mb-4">
                Your contributions have helped thousands of citizens understand their constitutional rights better.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-orange-600 mb-1">1,245</div>
                  <div className="text-sm text-gray-600">People Helped</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-orange-600 mb-1">89%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-gray-900">Popular Topics</h3>
              <div className="space-y-2">
                {['Fundamental Rights', 'Emergency Provisions', 'Judicial Review', 'Constitutional Amendments'].map((topic, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <span className="text-gray-900">{topic}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-600"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100)}%</span>
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
