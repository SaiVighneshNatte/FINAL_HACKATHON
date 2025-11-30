import React, { useState } from 'react';
import { BookOpen, Award, MessageCircle, Search, Menu, Bell, Bookmark, TrendingUp } from 'lucide-react';
import { Screen, Article } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CitizenDashboardProps {
  onNavigate: (screen: Screen, article?: Article) => void;
  bookmarkedArticles: string[];
  readProgress: Record<string, number>;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ 
  onNavigate, 
  bookmarkedArticles,
  readProgress 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'explore' | 'bookmarks'>('explore');

  const constitutionalSections = [
    {
      id: 'fundamental-rights',
      title: 'Fundamental Rights',
      description: 'Articles 12-35',
      icon: '⚖️',
      color: '#FF9933',
      articles: 24,
      image: 'https://images.unsplash.com/photo-1667849521034-0086c275e6da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhdGUlMjBtb251bWVudHxlbnwxfHx8fDE3NjQzMjk5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'fundamental-duties',
      title: 'Fundamental Duties',
      description: 'Article 51A',
      icon: '🤝',
      color: '#138808',
      articles: 11,
      image: 'https://images.unsplash.com/photo-1607778413290-6bc9b4cf30f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYXJsaWFtZW50fGVufDF8fHx8MTc2NDQzMTcwMnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'directive-principles',
      title: 'Directive Principles',
      description: 'Articles 36-51',
      icon: '📋',
      color: '#000080',
      articles: 16,
      image: 'https://images.unsplash.com/photo-1704871306556-33b85cf76d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjb25zdGl0dXRpb24lMjBib29rfGVufDF8fHx8MTc2NDQzMTcwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'judiciary',
      title: 'Judiciary',
      description: 'Articles 124-147',
      icon: '⚖️',
      color: '#FF9933',
      articles: 24,
      image: 'https://images.unsplash.com/photo-1752697589070-805ce3817859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwbGF3JTIwYm9va3N8ZW58MXx8fHwxNzY0MzQ2MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const sampleArticles: Article[] = [
    {
      id: 'art-14',
      number: 'Article 14',
      title: 'Equality before law',
      content: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      category: 'Fundamental Rights',
      historicalContext: 'Adopted from the British concept of "rule of law"',
      landmarkCases: ['Kesavananda Bharati v. State of Kerala (1973)', 'Maneka Gandhi v. Union of India (1978)']
    },
    {
      id: 'art-19',
      number: 'Article 19',
      title: 'Protection of certain rights regarding freedom of speech',
      content: 'All citizens shall have the right to freedom of speech and expression, to assemble peaceably and without arms, to form associations or unions.',
      category: 'Fundamental Rights',
      historicalContext: 'One of the most important fundamental rights in a democracy',
      landmarkCases: ['Romesh Thappar v. State of Madras (1950)', 'Shreya Singhal v. Union of India (2015)']
    },
    {
      id: 'art-21',
      number: 'Article 21',
      title: 'Protection of life and personal liberty',
      content: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
      category: 'Fundamental Rights',
      historicalContext: 'Most litigated article in the Constitution',
      landmarkCases: ['Maneka Gandhi v. Union of India (1978)', 'Francis Coralie Mullin v. Administrator (1981)']
    },
    {
      id: 'art-51a',
      number: 'Article 51A',
      title: 'Fundamental Duties',
      content: 'It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals and institutions.',
      category: 'Fundamental Duties',
      historicalContext: 'Added by 42nd Amendment in 1976',
      landmarkCases: ['AIIMS Students Union v. AIIMS (2001)']
    }
  ];

  const recentlyRead = sampleArticles.filter(article => readProgress[article.id] > 0);
  const bookmarked = sampleArticles.filter(article => bookmarkedArticles.includes(article.id));

  const quickActions = [
    {
      id: 'quiz',
      title: 'Take Quiz',
      icon: Award,
      color: '#FF9933',
      screen: 'quiz' as Screen
    },
    {
      id: 'discussion',
      title: 'Discussions',
      icon: MessageCircle,
      color: '#138808',
      screen: 'discussion' as Screen
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Menu className="w-6 h-6 text-gray-600" />
          <h2 className="text-gray-900">Constitution of India</h2>
          <Bell className="w-6 h-6 text-gray-600" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles, rights, duties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 flex gap-4 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('explore')}
          className={`pb-2 px-1 transition-colors ${
            activeTab === 'explore' 
              ? 'border-b-2 border-orange-500 text-orange-500' 
              : 'text-gray-500'
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-2 px-1 transition-colors flex items-center gap-1 ${
            activeTab === 'bookmarks' 
              ? 'border-b-2 border-orange-500 text-orange-500' 
              : 'text-gray-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Bookmarks
        </button>
      </div>

      <div className="p-6 space-y-6">
        {activeTab === 'explore' && (
          <>
            {/* Quick Actions */}
            <div>
              <h3 className="mb-3 text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onNavigate(action.screen)}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 transition-all hover:shadow-md active:scale-95"
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${action.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: action.color }} />
                      </div>
                      <span className="text-gray-900">{action.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recently Read */}
            {recentlyRead.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="text-gray-900">Continue Reading</h3>
                </div>
                <div className="space-y-2">
                  {recentlyRead.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => onNavigate('content-reader', article)}
                      className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left transition-all hover:shadow-md active:scale-98"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-orange-500 mb-1">{article.number}</div>
                          <h4 className="text-gray-900 mb-1">{article.title}</h4>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 transition-all"
                              style={{ width: `${readProgress[article.id] || 0}%` }}
                            />
                          </div>
                        </div>
                        <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Constitutional Sections */}
            <div>
              <h3 className="mb-3 text-gray-900">Constitutional Sections</h3>
              <div className="grid grid-cols-2 gap-3">
                {constitutionalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      // Navigate to first article in section
                      const firstArticle = sampleArticles.find(a => 
                        a.category === section.title
                      );
                      if (firstArticle) {
                        onNavigate('content-reader', firstArticle);
                      }
                    }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md active:scale-95"
                  >
                    <div className="relative h-24">
                      <ImageWithFallback 
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center text-4xl"
                        style={{ backgroundColor: `${section.color}99` }}
                      >
                        {section.icon}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-gray-900 mb-1">{section.title}</h4>
                      <p className="text-sm text-gray-500">{section.description}</p>
                      <div className="mt-2 text-xs text-gray-400">
                        {section.articles} articles
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Articles */}
            <div>
              <h3 className="mb-3 text-gray-900">Featured Articles</h3>
              <div className="space-y-3">
                {sampleArticles.slice(0, 3).map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onNavigate('content-reader', article)}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left transition-all hover:shadow-md active:scale-98"
                  >
                    <div className="text-orange-500 mb-1">{article.number}</div>
                    <h4 className="text-gray-900 mb-2">{article.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {article.category}
                      </span>
                      {bookmarkedArticles.includes(article.id) && (
                        <Bookmark className="w-4 h-4 fill-orange-500 text-orange-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookmarks' && (
          <div>
            {bookmarked.length > 0 ? (
              <div className="space-y-3">
                {bookmarked.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => onNavigate('content-reader', article)}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left transition-all hover:shadow-md active:scale-98"
                  >
                    <div className="text-orange-500 mb-1">{article.number}</div>
                    <h4 className="text-gray-900 mb-2">{article.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {article.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No Bookmarks Yet</h3>
                <p className="text-gray-500">
                  Start bookmarking articles to access them quickly
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
