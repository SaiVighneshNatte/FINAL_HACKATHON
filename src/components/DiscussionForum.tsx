import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, ThumbsUp, Send, Plus, Search, TrendingUp, Filter } from 'lucide-react';
import { UserRole } from '../App';

interface DiscussionForumProps {
  onBack: () => void;
  userRole: UserRole;
}

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  category: string;
  timestamp: string;
  replies: number;
  likes: number;
  isLiked?: boolean;
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({ onBack, userRole }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All', color: '#FF9933' },
    { id: 'fundamental-rights', label: 'Fundamental Rights', color: '#FF9933' },
    { id: 'duties', label: 'Duties', color: '#138808' },
    { id: 'judiciary', label: 'Judiciary', color: '#000080' },
    { id: 'amendments', label: 'Amendments', color: '#FF9933' }
  ];

  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: 'Understanding the difference between Article 19 and 21',
      author: 'Priya Sharma',
      authorRole: 'Citizen',
      content: 'Can someone explain the key differences between these two fundamental rights?',
      category: 'fundamental-rights',
      timestamp: '2 hours ago',
      replies: 8,
      likes: 15,
      isLiked: false
    },
    {
      id: 2,
      title: 'Emergency provisions and their implications',
      author: 'Dr. Rajesh Kumar',
      authorRole: 'Legal Expert',
      content: 'Let\'s discuss the three types of emergencies provided in the Constitution and their historical use.',
      category: 'amendments',
      timestamp: '5 hours ago',
      replies: 12,
      likes: 24,
      isLiked: true
    },
    {
      id: 3,
      title: 'How can we better fulfill our fundamental duties?',
      author: 'Amit Patel',
      authorRole: 'Citizen',
      content: 'Article 51A lists our fundamental duties. What are some practical ways to fulfill them in daily life?',
      category: 'duties',
      timestamp: '1 day ago',
      replies: 20,
      likes: 45,
      isLiked: false
    },
    {
      id: 4,
      title: 'Judicial review and its importance',
      author: 'Prof. Meera Singh',
      authorRole: 'Educator',
      content: 'The power of judicial review is crucial for maintaining constitutional supremacy. Let\'s explore landmark cases.',
      category: 'judiciary',
      timestamp: '1 day ago',
      replies: 15,
      likes: 32,
      isLiked: true
    },
    {
      id: 5,
      title: 'The 42nd Amendment and its impact',
      author: 'Legal Expert Verma',
      authorRole: 'Legal Expert',
      content: 'Known as the "Mini Constitution," the 42nd Amendment made significant changes. What are your thoughts?',
      category: 'amendments',
      timestamp: '2 days ago',
      replies: 18,
      likes: 38,
      isLiked: false
    }
  ]);

  const handleLike = (id: number) => {
    setDiscussions(discussions.map(d => 
      d.id === id 
        ? { ...d, likes: d.isLiked ? d.likes - 1 : d.likes + 1, isLiked: !d.isLiked }
        : d
    ));
  };

  const handleCreateDiscussion = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newDiscussion: Discussion = {
        id: discussions.length + 1,
        title: newTitle,
        author: 'You',
        authorRole: userRole === 'citizen' ? 'Citizen' : 
                    userRole === 'educator' ? 'Educator' :
                    userRole === 'admin' ? 'Admin' : 'Legal Expert',
        content: newContent,
        category: selectedCategory === 'all' ? 'fundamental-rights' : selectedCategory,
        timestamp: 'Just now',
        replies: 0,
        likes: 0,
        isLiked: false
      };
      setDiscussions([newDiscussion, ...discussions]);
      setNewTitle('');
      setNewContent('');
      setShowNewDiscussion(false);
    }
  };

  const filteredDiscussions = discussions.filter(d => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingTopics = [
    { title: 'Article 370', count: 45 },
    { title: 'Right to Privacy', count: 38 },
    { title: 'CAA 2019', count: 32 },
    { title: 'GST Amendment', count: 28 }
  ];

  if (showNewDiscussion) {
    return (
      <div className="min-h-screen bg-white" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowNewDiscussion(false)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h2 className="text-gray-900">New Discussion</h2>
            <button
              onClick={handleCreateDiscussion}
              disabled={!newTitle.trim() || !newContent.trim()}
              className="text-orange-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What do you want to discuss?"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={8}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <button
            onClick={handleCreateDiscussion}
            disabled={!newTitle.trim() || !newContent.trim()}
            className="w-full bg-orange-600 text-white py-4 rounded-xl transition-all hover:bg-orange-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Discussion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h2 className="text-gray-900">Discussions</h2>
            <button
              onClick={() => setShowNewDiscussion(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="w-6 h-6 text-orange-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : undefined
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Trending Topics */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-gray-900">Trending Topics</h3>
          </div>
          <div className="space-y-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-gray-900">#{topic.title}</span>
                <span className="text-sm text-gray-500">{topic.count} posts</span>
              </button>
            ))}
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-3">
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    {discussion.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{discussion.author}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {discussion.authorRole}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{discussion.timestamp}</div>
                  </div>
                </div>

                <h3 className="text-gray-900 mb-2">{discussion.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{discussion.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(discussion.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <ThumbsUp 
                        className={`w-4 h-4 ${discussion.isLiked ? 'fill-orange-600 text-orange-600' : ''}`}
                      />
                      <span className="text-sm">{discussion.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{discussion.replies}</span>
                    </button>
                  </div>
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                    {categories.find(c => c.id === discussion.category)?.label}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No discussions found</h3>
              <p className="text-gray-500 mb-4">
                Be the first to start a discussion on this topic
              </p>
              <button
                onClick={() => setShowNewDiscussion(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-xl transition-all hover:bg-orange-700 active:scale-98"
              >
                Start Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
