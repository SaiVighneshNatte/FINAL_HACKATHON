import React, { useState } from 'react';
import { ChevronRight, BookOpen, Scale, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Welcome to Constitution of India',
      description: 'Learn about your rights, duties, and the pillars of Indian democracy',
      image: 'https://images.unsplash.com/photo-1704871306556-33b85cf76d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjb25zdGl0dXRpb24lMjBib29rfGVufDF8fHx8MTc2NDQzMTcwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: BookOpen,
      color: '#FF9933'
    },
    {
      title: 'Interactive Learning',
      description: 'Engage with quizzes, discussions, and comprehensive constitutional content',
      image: 'https://images.unsplash.com/photo-1758270704522-f091f8064a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwbW9iaWxlfGVufDF8fHx8MTc2NDQzMTcwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Users,
      color: '#138808'
    },
    {
      title: 'Expert Guidance',
      description: 'Access insights from legal experts and educators to deepen your understanding',
      image: 'https://images.unsplash.com/photo-1752697589070-805ce3817859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXN0aWNlJTIwbGF3JTIwYm9va3N8ZW58MXx8fHwxNzY0MzQ2MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Scale,
      color: '#000080'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Hero Image */}
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback 
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
        <div 
          className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: slide.color }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        <div className="flex-1">
          <h1 className="mb-4" style={{ color: slide.color }}>
            {slide.title}
          </h1>
          <p className="text-gray-600 mb-8">
            {slide.description}
          </p>

          {/* Progress Indicators */}
          <div className="flex gap-2 justify-center mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: currentSlide === index ? '32px' : '8px',
                  backgroundColor: currentSlide === index ? slide.color : '#E5E7EB'
                }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleNext}
            className="w-full py-4 px-6 rounded-xl text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: slide.color }}
          >
            {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
            <ChevronRight className="w-5 h-5" />
          </button>

          {currentSlide < slides.length - 1 && (
            <button
              onClick={handleSkip}
              className="w-full py-4 px-6 rounded-xl text-gray-600 transition-all hover:bg-gray-100 active:scale-95"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
