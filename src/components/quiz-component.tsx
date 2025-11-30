import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Timer, Lightbulb, Award, TrendingUp } from 'lucide-react';

interface QuizComponentProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const quizQuestions = [
  {
    id: 1,
    question: "Which article of the Constitution guarantees the Right to Equality?",
    options: ["Article 12", "Article 14", "Article 16", "Article 18"],
    correct: 1,
    explanation: "Article 14 guarantees equality before law and equal protection of laws to all persons."
  },
  {
    id: 2,
    question: "How many fundamental rights are guaranteed by the Indian Constitution?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    explanation: "The Constitution originally guaranteed 7 fundamental rights, but after the 44th Amendment, there are 6 fundamental rights."
  },
  {
    id: 3,
    question: "Which article is known as the 'Heart and Soul' of the Constitution?",
    options: ["Article 21", "Article 32", "Article 19", "Article 15"],
    correct: 1,
    explanation: "Article 32 (Right to Constitutional Remedies) is called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar."
  },
  {
    id: 4,
    question: "The Preamble of the Constitution declares India as:",
    options: ["Secular Republic", "Socialist Republic", "Democratic Republic", "All of the above"],
    correct: 3,
    explanation: "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic."
  },
  {
    id: 5,
    question: "Which fundamental duty was added by the 86th Constitutional Amendment?",
    options: ["To protect environment", "To promote scientific temper", "To provide education to children", "To respect national flag"],
    correct: 2,
    explanation: "The 86th Amendment (2002) added the duty of parents/guardians to provide education to children between 6-14 years."
  }
];

export function QuizComponent({ onComplete, onBack }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
    setShowHint(false);
    
    // Update streak
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      const correctAnswers = selectedAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correct
      ).length;
      const score = Math.round((correctAnswers / quizQuestions.length) * 100);
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === quizQuestions[index].correct
    ).length;
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    onComplete(score);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correct;

  if (showResult) {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === quizQuestions[index].correct
    ).length;
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Header with Image */}
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1598981457915-aea220950616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWl6JTIwdGVzdCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjQ0MTk1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Quiz Complete"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50"></div>
          <div className="absolute top-4 left-4">
            <Button variant="ghost" onClick={onBack} className="text-white bg-white/20 backdrop-blur-sm hover:bg-white/30">
              ← Back
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h1 className="text-2xl text-white drop-shadow-lg mb-2">Quiz Complete!</h1>
            <p className="text-white/90 drop-shadow">Fundamental Rights Quiz</p>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 -mt-12 relative z-10">
          {/* Result Card */}
          <Card className="mb-6 shadow-xl">
            <div className="p-6 text-center">
              <div className="text-6xl mb-4">
                {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
              </div>
              
              <h2 className="text-2xl text-[#000080] mb-2">
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Work!' : 'Keep Learning!'}
              </h2>
              
              <div className="text-4xl mb-4">
                <span className={score >= 80 ? 'text-[#138808]' : score >= 60 ? 'text-[#FF9933]' : 'text-gray-600'}>
                  {score}%
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                You got {correctAnswers} out of {quizQuestions.length} questions correct
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge className={
                  score >= 80 ? 'bg-[#138808]' :
                  score >= 60 ? 'bg-[#FF9933]' : 'bg-gray-600'
                }>
                  {score >= 80 ? 'Constitutional Expert' :
                   score >= 60 ? 'Good Understanding' : 'Needs Improvement'}
                </Badge>
                {score >= 80 && <Award className="w-5 h-5 text-[#FF9933]" fill="#FF9933" />}
              </div>
              
              {/* Points Earned */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>+{score * 10} points earned</span>
              </div>
            </div>
          </Card>

          {/* Performance Breakdown */}
          <Card className="mb-6">
            <div className="p-4">
              <h3 className="text-[#000080] mb-3">📊 Performance Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg text-[#138808]">{correctAnswers}</div>
                    <div className="text-xs text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-lg text-red-500">{quizQuestions.length - correctAnswers}</div>
                    <div className="text-xs text-gray-600">Incorrect</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={handleFinish}
              className="w-full bg-[#138808] hover:bg-[#138808]/90"
            >
              Continue Learning
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-[#FF9933] text-[#FF9933]"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers([]);
                setShowResult(false);
                setShowExplanation(false);
              }}
            >
              Retake Quiz
            </Button>
          </div>

          {/* Learning Suggestion */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <div className="p-4 text-center">
              <h3 className="text-[#000080] mb-2">💡 Keep Learning</h3>
              <p className="text-sm text-gray-600 mb-3">
                {score < 60 ? 
                  'Review the Fundamental Rights section to improve your understanding' :
                  'Try the Directive Principles quiz next!'
                }
              </p>
              <Button size="sm" variant="outline" className="border-[#000080] text-[#000080]">
                View Study Material
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-40 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1598981457915-aea220950616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWl6JTIwdGVzdCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjQ0MTk1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Quiz"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-md mx-auto p-4 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="text-white bg-white/20 backdrop-blur-sm hover:bg-white/30">
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              {streak > 0 && (
                <Badge className="bg-[#FF9933] gap-1">
                  🔥 {streak} Streak
                </Badge>
              )}
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 gap-1">
                <Timer className="w-3 h-3" />
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Badge>
            </div>
          </div>
          <div>
            <h1 className="text-xl text-white drop-shadow-lg mb-1">Fundamental Rights Quiz</h1>
            <p className="text-sm text-white/90 drop-shadow">Question {currentQuestion + 1} of {quizQuestions.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-lg -mt-6 relative z-20">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#FF9933] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">❓</span>
              </div>
              <div className="flex-1 px-4">
                <h2 className="text-lg text-[#000080]">
                  {currentQ.question}
                </h2>
              </div>
              {!showExplanation && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="flex-shrink-0"
                >
                  <Lightbulb className="w-4 h-4 text-[#FF9933]" />
                </Button>
              )}
            </div>
            
            {showHint && !showExplanation && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  💡 Hint: Think about the fundamental principles of equality and justice in the Constitution.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswers[currentQuestion] !== undefined}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? index === currentQ.correct
                        ? 'bg-[#138808]/10 border-[#138808] text-[#138808]'
                        : 'bg-red-50 border-red-500 text-red-600'
                      : selectedAnswers[currentQuestion] !== undefined && index === currentQ.correct
                        ? 'bg-[#138808]/10 border-[#138808] text-[#138808]'
                        : 'border-gray-200 hover:border-[#FF9933] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? index === currentQ.correct
                          ? 'bg-[#138808] border-[#138808]'
                          : 'bg-red-500 border-red-500'
                        : selectedAnswers[currentQuestion] !== undefined && index === currentQ.correct
                          ? 'bg-[#138808] border-[#138808]'
                          : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index || 
                       (selectedAnswers[currentQuestion] !== undefined && index === currentQ.correct) ? (
                        <span className="text-white text-sm">
                          {index === currentQ.correct ? '✓' : '✗'}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className={`mb-6 border-l-4 ${
            isCorrect ? 'border-l-[#138808] bg-green-50' : 'border-l-red-500 bg-red-50'
          }`}>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={isCorrect ? 'text-[#138808]' : 'text-red-500'}>
                  {isCorrect ? '✅' : '❌'}
                </span>
                <h3 className={`text-sm ${isCorrect ? 'text-[#138808]' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
              </div>
              <p className="text-sm text-gray-700">
                {currentQ.explanation}
              </p>
            </div>
          </Card>
        )}

        {/* Next Button */}
        {selectedAnswers[currentQuestion] !== undefined && (
          <Button 
            onClick={handleNext}
            className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}

        {/* Quiz Info */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <div className="p-4 text-center">
            <h3 className="text-[#000080] mb-2">💡 Did You Know?</h3>
            <p className="text-sm text-gray-600">
              The Constitution of India is the longest written constitution in the world with 395 articles.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}