import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, Share2, Volume2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Article } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContentReaderProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  progress: number;
  onUpdateProgress: (articleId: string, progress: number) => void;
}

export const ContentReader: React.FC<ContentReaderProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  progress,
  onUpdateProgress
}) => {
  const [showHistoricalContext, setShowHistoricalContext] = useState(false);
  const [showLandmarkCases, setShowLandmarkCases] = useState(false);
  const [readingProgress, setReadingProgress] = useState(progress);

  useEffect(() => {
    // Simulate reading progress
    const timer = setTimeout(() => {
      if (readingProgress < 100) {
        const newProgress = Math.min(readingProgress + 10, 100);
        setReadingProgress(newProgress);
        onUpdateProgress(article.id, newProgress);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [readingProgress, article.id, onUpdateProgress]);

  const categoryColors: Record<string, string> = {
    'Fundamental Rights': '#FF9933',
    'Fundamental Duties': '#138808',
    'Directive Principles': '#000080',
    'Judiciary': '#FF9933'
  };

  const categoryColor = categoryColors[article.category] || '#FF9933';

  const sectionImages: Record<string, string> = {
    'Fundamental Rights': 'https://images.unsplash.com/photo-1667849521034-0086c275e6da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhdGUlMjBtb251bWVudHxlbnwxfHx8fDE3NjQzMjk5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Fundamental Duties': 'https://images.unsplash.com/photo-1607778413290-6bc9b4cf30f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYXJsaWFtZW50fGVufDF8fHx8MTc2NDQzMTcwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Directive Principles': 'https://images.unsplash.com/photo-1704871306556-33b85cf76d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjb25zdGl0dXRpb24lMjBib29rfGVufDF8fHx8MTc2NDQzMTcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Judiciary': 'https://images.unsplash.com/photo-1752697589070-805ce3817859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwbGF3JTIwYm9va3N8ZW58MXx8fHwxNzY0MzQ2MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  return (
    <div className="min-h-screen bg-white" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
        <div className="px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Volume2 className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => onToggleBookmark(article.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bookmark 
                className={`w-5 h-5 transition-colors ${
                  isBookmarked ? 'fill-orange-500 text-orange-500' : 'text-gray-600'
                }`}
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${readingProgress}%`,
              backgroundColor: categoryColor
            }}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-48">
        <ImageWithFallback 
          src={sectionImages[article.category] || sectionImages['Fundamental Rights']}
          alt={article.category}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: `${categoryColor}66` }}
        />
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Article Header */}
        <div>
          <div 
            className="inline-block px-3 py-1 rounded-full text-sm text-white mb-3"
            style={{ backgroundColor: categoryColor }}
          >
            {article.category}
          </div>
          <div className="text-orange-600 mb-2">{article.number}</div>
          <h1 className="text-gray-900 mb-4">{article.title}</h1>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg">
          <p className="text-gray-700 leading-relaxed">
            {article.content}
          </p>
        </div>

        {/* Historical Context */}
        {article.historicalContext && (
          <div className="bg-orange-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowHistoricalContext(!showHistoricalContext)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <span className="text-gray-900">Historical Context</span>
              {showHistoricalContext ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showHistoricalContext && (
              <div className="px-4 pb-4">
                <p className="text-gray-700">
                  {article.historicalContext}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Landmark Cases */}
        {article.landmarkCases && article.landmarkCases.length > 0 && (
          <div className="bg-blue-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowLandmarkCases(!showLandmarkCases)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <span className="text-gray-900">Landmark Cases</span>
              {showLandmarkCases ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {showLandmarkCases && (
              <div className="px-4 pb-4 space-y-2">
                {article.landmarkCases.map((caseItem, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
                    <span>{caseItem}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Key Points */}
        <div className="bg-green-50 p-4 rounded-xl">
          <h3 className="text-gray-900 mb-3">Key Points</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
              <span>This article is part of {article.category}</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
              <span>Enforceable by the courts through writs</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
              <span>Forms the foundation of Indian democracy</span>
            </li>
          </ul>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-gray-900 mb-3">Related Articles</h3>
          <div className="space-y-2">
            {['Article 14 - Equality before law', 'Article 19 - Freedom of speech', 'Article 21 - Right to life'].map((related, index) => (
              <button
                key={index}
                className="w-full p-3 bg-gray-50 rounded-xl text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-900">{related}</span>
                <ChevronDown className="w-5 h-5 text-gray-400 rotate-[-90deg]" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
