import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { RoleSelection } from './components/RoleSelection';
import { CitizenDashboard } from './components/CitizenDashboard';
import { EducatorDashboard } from './components/EducatorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalExpertDashboard } from './components/LegalExpertDashboard';
import { ContentReader } from './components/ContentReader';
import { QuizComponent } from './components/QuizComponent';
import { DiscussionForum } from './components/DiscussionForum';

export type UserRole = 'citizen' | 'educator' | 'admin' | 'legal-expert' | null;
export type Screen = 'onboarding' | 'role-selection' | 'dashboard' | 'content-reader' | 'quiz' | 'discussion';

export interface Article {
  id: string;
  number: string;
  title: string;
  content: string;
  category: string;
  historicalContext?: string;
  landmarkCases?: string[];
  isBookmarked?: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [readProgress, setReadProgress] = useState<Record<string, number>>({});

  const handleOnboardingComplete = () => {
    setCurrentScreen('role-selection');
  };

  const handleRoleSelection = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen, article?: Article) => {
    if (article) {
      setSelectedArticle(article);
    }
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
    setSelectedArticle(null);
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const updateProgress = (articleId: string, progress: number) => {
    setReadProgress(prev => ({
      ...prev,
      [articleId]: progress
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'role-selection' && (
        <RoleSelection onSelectRole={handleRoleSelection} />
      )}
      
      {currentScreen === 'dashboard' && userRole === 'citizen' && (
        <CitizenDashboard 
          onNavigate={handleNavigate}
          bookmarkedArticles={bookmarkedArticles}
          readProgress={readProgress}
        />
      )}
      
      {currentScreen === 'dashboard' && userRole === 'educator' && (
        <EducatorDashboard onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'dashboard' && userRole === 'admin' && (
        <AdminDashboard onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'dashboard' && userRole === 'legal-expert' && (
        <LegalExpertDashboard onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'content-reader' && selectedArticle && (
        <ContentReader 
          article={selectedArticle}
          onBack={handleBack}
          isBookmarked={bookmarkedArticles.includes(selectedArticle.id)}
          onToggleBookmark={toggleBookmark}
          progress={readProgress[selectedArticle.id] || 0}
          onUpdateProgress={updateProgress}
        />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizComponent onBack={handleBack} userRole={userRole} />
      )}
      
      {currentScreen === 'discussion' && (
        <DiscussionForum onBack={handleBack} userRole={userRole} />
      )}
    </div>
  );
}
