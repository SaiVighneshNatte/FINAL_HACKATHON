import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Trophy, Star, TrendingUp, Award, Bell } from 'lucide-react';

interface CitizenDashboardProps {
  onLogout: () => void;
  onContentSelect: (contentId: string) => void;
  onQuizStart: () => void;
}

const constitutionTopics = [
  { 
    id: 'fundamental-rights', 
    title: 'Fundamental Rights', 
    icon: '⚖️', 
    articles: 24, 
    color: 'bg-[#138808]', 
    description: 'Articles 12-35',
    image: 'https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwbGF3fGVufDF8fHx8MTc2NDQxOTU3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 65
  },
  { 
    id: 'fundamental-duties', 
    title: 'Fundamental Duties', 
    icon: '🤝', 
    articles: 11, 
    color: 'bg-[#FF9933]', 
    description: 'Article 51A',
    image: 'https://images.unsplash.com/photo-1542315099045-93937d70c67a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjQzMzU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 45
  },
  { 
    id: 'directive-principles', 
    title: 'Directive Principles', 
    icon: '📋', 
    articles: 16, 
    color: 'bg-[#000080]', 
    description: 'Articles 36-51',
    image: 'https://images.unsplash.com/photo-1701790644702-292e25180524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwbGlicmFyeSUyMGNvbnN0aXR1dGlvbnxlbnwxfHx8fDE3NjQ0MTk1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 30
  },
  { 
    id: 'union-government', 
    title: 'Union Government', 
    icon: '🏛️', 
    articles: 20, 
    color: 'bg-purple-600', 
    description: 'Articles 52-151',
    image: 'https://images.unsplash.com/photo-1760872645959-98d5fdb49287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYXJsaWFtZW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0NDE5NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 20
  },
  { 
    id: 'state-government', 
    title: 'State Government', 
    icon: '🏢', 
    articles: 18, 
    color: 'bg-blue-600', 
    description: 'Articles 152-237',
    image: 'https://images.unsplash.com/photo-1662728132385-11fee9b3db9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0MzU0MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 10
  },
  { 
    id: 'judiciary', 
    title: 'Judiciary', 
    icon: '⚖️', 
    articles: 10, 
    color: 'bg-red-600', 
    description: 'Articles 124-147',
    image: 'https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwbGF3fGVufDF8fHx8MTc2NDQxOTU3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 55
  }
];

const recentQuizzes = [
  { id: 1, title: 'Fundamental Rights Quiz', score: 85, questions: 10, date: '2 days ago', badge: 'gold' },
  { id: 2, title: 'Preamble Quiz', score: 92, questions: 5, date: '5 days ago', badge: 'platinum' },
  { id: 3, title: 'Directive Principles', score: 78, questions: 8, date: '1 week ago', badge: 'silver' }
];

const discussions = [
  { id: 1, title: 'Right to Privacy: Recent Developments', replies: 24, expert: 'Dr. Sharma', avatar: '👨‍⚖️', time: '2h ago', category: 'Rights' },
  { id: 2, title: 'Understanding Article 370', replies: 18, expert: 'Adv. Patel', avatar: '👩‍⚖️', time: '4h ago', category: 'Government' },
  { id: 3, title: 'Women\'s Rights in Constitution', replies: 31, expert: 'Justice Rao', avatar: '👨‍💼', time: '1d ago', category: 'Rights' }
];

const achievements = [
  { id: 1, icon: '🏆', title: 'Quiz Master', desc: 'Complete 10 quizzes', progress: 7, total: 10 },
  { id: 2, icon: '📚', title: 'Knowledge Seeker', desc: 'Read 50 articles', progress: 32, total: 50 },
  { id: 3, icon: '💬', title: 'Active Participant', desc: 'Join 5 discussions', progress: 3, total: 5 },
  { id: 4, icon: '⭐', title: 'Perfect Score', desc: 'Score 100% in a quiz', progress: 0, total: 1 }
];

const learningStreak = 7; // days
const totalPoints = 2450;
const currentLevel = 3;

export function CitizenDashboard({ onLogout, onContentSelect, onQuizStart }: CitizenDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('learn');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header with Image */}
      <div className="relative h-48 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1629027265737-7e471b731e3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmbGFnJTIwdHJpY29sb3J8ZW58MXx8fHwxNzY0MzUxOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Indian Flag"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-md mx-auto p-4 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h1 className="text-white drop-shadow-lg">Welcome Back!</h1>
                <p className="text-sm text-white/90 drop-shadow">Citizen Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="relative p-2 bg-white/20 backdrop-blur-sm rounded-full"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Button variant="ghost" onClick={onLogout} className="text-white bg-white/20 backdrop-blur-sm hover:bg-white/30">
                Profile
              </Button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-[#FF9933]" fill="#FF9933" />
                  <span className="text-xs text-gray-600">Level</span>
                </div>
                <p className="text-xl text-[#000080]">{currentLevel}</p>
              </div>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-[#138808]" />
                  <span className="text-xs text-gray-600">Points</span>
                </div>
                <p className="text-xl text-[#000080]">{totalPoints}</p>
              </div>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <div className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#FF9933]" />
                  <span className="text-xs text-gray-600">Streak</span>
                </div>
                <p className="text-xl text-[#000080]">{learningStreak}d</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-20">
        <div className="relative">
          <Input
            placeholder="Search articles, rights, duties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white shadow-lg border-2 border-[#000080]/10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="discuss">Discuss</TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Constitution Topics</h2>
              <Badge variant="secondary" className="gap-1">
                <BookOpen className="w-3 h-3" />
                6 Categories
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {constitutionTopics.map((topic) => (
                <Card key={topic.id} className="border-2 hover:border-[#FF9933] transition-all cursor-pointer overflow-hidden group hover:shadow-lg">
                  <button 
                    onClick={() => onContentSelect(topic.id)}
                    className="w-full text-left"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <ImageWithFallback 
                        src={topic.image}
                        alt={topic.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className={`absolute top-2 right-2 w-8 h-8 ${topic.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <span className="text-white">{topic.icon}</span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-1.5">
                          <div 
                            className="bg-white rounded-full h-1.5 transition-all"
                            style={{ width: `${topic.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm text-[#000080] mb-1">{topic.title}</h3>
                      <p className="text-xs text-gray-600 mb-1">{topic.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{topic.articles} articles</span>
                        <span className="text-[#138808]">{topic.progress}% done</span>
                      </div>
                    </div>
                  </button>
                </Card>
              ))}
            </div>

            {/* Featured Learning Card */}
            <Card className="bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10 border-[#FF9933]/20 overflow-hidden">
              <div className="relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#138808]/10 rounded-full -mr-16 -mt-16"></div>
                <div className="p-4 relative z-10">
                  <Badge className="bg-[#FF9933] mb-2">📅 Today's Focus</Badge>
                  <h3 className="text-[#000080] mb-2">Article 14: Right to Equality</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    The State shall not deny to any person equality before the law or the equal protection of the laws...
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#138808] hover:bg-[#138808]/90"
                      onClick={() => onContentSelect('fundamental-rights')}
                    >
                      Continue Reading
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-[#000080] text-[#000080]"
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Bookmark
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Your Progress</h2>
              <Badge className="bg-[#138808] gap-1">
                <Star className="w-3 h-3" fill="white" />
                Level {currentLevel}
              </Badge>
            </div>

            {/* Weekly Challenge */}
            <Card className="bg-gradient-to-r from-[#138808]/10 to-[#FF9933]/10 border-[#138808] border-2 overflow-hidden">
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1598981457915-aea220950616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWl6JTIwdGVzdCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjQ0MTk1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Quiz Challenge"
                  className="w-full h-32 object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#138808]/60 to-[#FF9933]/60"></div>
                <div className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center">
                  <h3 className="text-white mb-1 drop-shadow-lg">🎯 Weekly Challenge</h3>
                  <p className="text-sm text-white/90 mb-3 drop-shadow">Fundamental Rights Master Quiz</p>
                  <Button 
                    className="bg-white text-[#FF9933] hover:bg-white/90 shadow-lg"
                    onClick={onQuizStart}
                  >
                    Start Challenge
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Quiz Results */}
            <div>
              <h3 className="text-sm text-[#000080] mb-3">Recent Quiz Results</h3>
              {recentQuizzes.map((quiz) => (
                <Card key={quiz.id} className="mb-3 hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm text-gray-800">{quiz.title}</h4>
                          {quiz.badge === 'platinum' && <span className="text-xs">💎</span>}
                          {quiz.badge === 'gold' && <span className="text-xs">🏆</span>}
                          {quiz.badge === 'silver' && <span className="text-xs">🥈</span>}
                        </div>
                        <p className="text-xs text-gray-500">{quiz.questions} questions • {quiz.date}</p>
                      </div>
                      <Badge 
                        className={`${
                          quiz.score >= 90 ? 'bg-[#138808]' : 
                          quiz.score >= 80 ? 'bg-[#FF9933]' : 
                          'bg-gray-500'
                        }`}
                      >
                        {quiz.score}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          quiz.score >= 90 ? 'bg-[#138808]' : 
                          quiz.score >= 80 ? 'bg-[#FF9933]' : 
                          'bg-gray-500'
                        }`}
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Quiz Options */}
            <Card>
              <div className="p-4">
                <h3 className="text-sm text-[#000080] mb-3">Quick Quizzes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="flex flex-col h-auto py-3">
                    <span className="text-2xl mb-1">⚡</span>
                    <span className="text-xs">5-Min Quiz</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex flex-col h-auto py-3">
                    <span className="text-2xl mb-1">🎲</span>
                    <span className="text-xs">Random</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex flex-col h-auto py-3">
                    <span className="text-2xl mb-1">🔥</span>
                    <span className="text-xs">Daily Streak</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex flex-col h-auto py-3">
                    <span className="text-2xl mb-1">💪</span>
                    <span className="text-xs">Practice</span>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="discuss" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Active Discussions</h2>
              <Button size="sm" variant="outline" className="border-[#FF9933] text-[#FF9933]">
                + New Post
              </Button>
            </div>

            {/* Discussion Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge variant="secondary" className="whitespace-nowrap cursor-pointer hover:bg-[#FF9933] hover:text-white transition-colors">
                All
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-[#FF9933] hover:text-white transition-colors">
                Rights
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-[#FF9933] hover:text-white transition-colors">
                Government
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-[#FF9933] hover:text-white transition-colors">
                Judiciary
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-[#FF9933] hover:text-white transition-colors">
                Amendments
              </Badge>
            </div>

            {discussions.map((discussion) => (
              <Card key={discussion.id} className="border-l-4 border-l-[#FF9933] hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl">{discussion.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm text-[#000080]">{discussion.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span>Expert: {discussion.expert}</span>
                        <span>•</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {discussion.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">💬 {discussion.replies} replies</span>
                      <span className="text-gray-600">👍 {Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-[#138808] h-auto p-1">
                      View →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Ask Expert Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 overflow-hidden">
              <div className="relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1687289133469-b2a07a13b78b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwc2NhbGVzJTIwbGF3fGVufDF8fHx8MTc2NDQxOTU3MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Legal Expert"
                  className="w-full h-24 object-cover opacity-20"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-center text-center">
                  <h3 className="text-[#000080] mb-2">💬 Ask a Legal Expert</h3>
                  <p className="text-sm text-gray-600 mb-3">Get answers from constitutional law experts</p>
                  <Button size="sm" className="bg-[#000080] hover:bg-[#000080]/90 mx-auto">
                    Ask Question
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#000080]">Your Achievements</h2>
              <Badge variant="secondary">4 Active</Badge>
            </div>

            {/* Achievement Progress */}
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-sm text-[#000080] mb-1">{achievement.title}</h3>
                        <p className="text-xs text-gray-600 mb-2">{achievement.desc}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#FF9933] rounded-full h-2 transition-all"
                              style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600 whitespace-nowrap">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Leaderboard Preview */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-[#FF9933]/30">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-[#000080]">🏆 Leaderboard</h3>
                  <Button size="sm" variant="ghost" className="text-[#FF9933] h-auto p-0">
                    View All →
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🥇</span>
                      <span className="text-sm">Rahul K.</span>
                    </div>
                    <span className="text-sm text-[#138808]">3,250 pts</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🥈</span>
                      <span className="text-sm">Priya S.</span>
                    </div>
                    <span className="text-sm text-[#138808]">2,890 pts</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-2 border-2 border-[#FF9933]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👤</span>
                      <span className="text-sm">You</span>
                    </div>
                    <span className="text-sm text-[#138808]">{totalPoints} pts</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="grid grid-cols-4 gap-1">
            <Button 
              variant={activeTab === 'learn' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col gap-1 h-12 ${activeTab === 'learn' ? 'bg-[#FF9933] text-white' : ''}`}
              onClick={() => setActiveTab('learn')}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs">Learn</span>
            </Button>
            <Button 
              variant={activeTab === 'quiz' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col gap-1 h-12 ${activeTab === 'quiz' ? 'bg-[#FF9933] text-white' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <Trophy className="w-4 h-4" />
              <span className="text-xs">Quiz</span>
            </Button>
            <Button 
              variant={activeTab === 'discuss' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col gap-1 h-12 ${activeTab === 'discuss' ? 'bg-[#FF9933] text-white' : ''}`}
              onClick={() => setActiveTab('discuss')}
            >
              <span className="text-lg">💬</span>
              <span className="text-xs">Discuss</span>
            </Button>
            <Button 
              variant={activeTab === 'achievements' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col gap-1 h-12 ${activeTab === 'achievements' ? 'bg-[#FF9933] text-white' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award className="w-4 h-4" />
              <span className="text-xs">Awards</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
