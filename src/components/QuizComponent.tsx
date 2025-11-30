import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Award, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { UserRole } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface QuizComponentProps {
  onBack: () => void;
  userRole: UserRole;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ onBack, userRole }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Which article of the Indian Constitution guarantees equality before law?',
      options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
      correctAnswer: 1,
      explanation: 'Article 14 states that the State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
      category: 'Fundamental Rights'
    },
    {
      id: 2,
      question: 'How many Fundamental Duties are listed in the Indian Constitution?',
      options: ['10', '11', '12', '13'],
      correctAnswer: 1,
      explanation: 'There are 11 Fundamental Duties listed in Article 51A of the Indian Constitution, originally 10, with the 11th added by the 86th Amendment.',
      category: 'Fundamental Duties'
    },
    {
      id: 3,
      question: 'Which article deals with the Right to Freedom of Speech and Expression?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
      correctAnswer: 1,
      explanation: 'Article 19(1)(a) guarantees all citizens the right to freedom of speech and expression, subject to reasonable restrictions.',
      category: 'Fundamental Rights'
    },
    {
      id: 4,
      question: 'Who is known as the architect of the Indian Constitution?',
      options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Dr. B.R. Ambedkar', 'Sardar Patel'],
      correctAnswer: 2,
      explanation: 'Dr. B.R. Ambedkar, as the Chairman of the Drafting Committee, is widely regarded as the architect of the Indian Constitution.',
      category: 'Constitutional History'
    },
    {
      id: 5,
      question: 'Which part of the Constitution contains Directive Principles of State Policy?',
      options: ['Part II', 'Part III', 'Part IV', 'Part V'],
      correctAnswer: 2,
      explanation: 'Part IV of the Constitution (Articles 36-51) contains the Directive Principles of State Policy.',
      category: 'Directive Principles'
    }
  ];

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleTimeUp();
    }
  }, [timeLeft, quizStarted, showResult, selectedAnswer]);

  const handleTimeUp = () => {
    setAnswers([...answers, false]);
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      }, 1500);
    } else {
      setShowResult(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, isCorrect]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setAnswers([]);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="px-6 py-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="px-6 py-8 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-gray-900 mb-2">Constitutional Quiz</h1>
            <p className="text-gray-600">
              Test your knowledge of the Indian Constitution
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-gray-900">30 seconds per question</div>
                <div className="text-sm text-gray-500">Answer before time runs out</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-gray-900">{questions.length} Questions</div>
                <div className="text-sm text-gray-500">Multiple choice format</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-gray-900">Earn Points</div>
                <div className="text-sm text-gray-500">Track your progress</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-orange-600 text-white py-4 rounded-xl transition-all hover:bg-orange-700 active:scale-98"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white" style={{ maxWidth: '390px', margin: '0 auto' }}>
        <div className="px-6 py-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="px-6 py-8 space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: `conic-gradient(#FF9933 ${percentage}%, #E5E7EB ${percentage}%)`
              }}
            >
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-orange-600 mb-1">{percentage}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
              </div>
            </div>
            <h1 className="text-gray-900 mb-2">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </h1>
            <p className="text-gray-600">
              You got {score} out of {questions.length} questions correct
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 mb-4">Question Review</h3>
            <div className="space-y-3">
              {questions.map((q, index) => (
                <div 
                  key={q.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    answers[index] ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {answers[index] ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900 text-sm">Question {index + 1}</div>
                    <div className="text-xs text-gray-500">{q.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetakeQuiz}
              className="w-full bg-orange-600 text-white py-4 rounded-xl transition-all hover:bg-orange-700 active:scale-98"
            >
              Retake Quiz
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white text-gray-900 border-2 border-gray-200 py-4 rounded-xl transition-all hover:bg-gray-50 active:scale-98"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white" style={{ maxWidth: '390px', margin: '0 auto' }}>
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
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className={`${timeLeft <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-orange-600"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-8 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm mb-4">
                {question.category}
              </div>
              <h2 className="text-gray-900">{question.question}</h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = selectedAnswer !== null;

                let buttonClass = 'w-full p-4 rounded-xl border-2 text-left transition-all ';
                
                if (!showResult) {
                  buttonClass += 'border-gray-200 hover:border-orange-300 hover:bg-orange-50 active:scale-98';
                } else if (isCorrect) {
                  buttonClass += 'border-green-500 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-50';
                } else {
                  buttonClass += 'border-gray-200 opacity-50';
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null}
                    whileTap={{ scale: selectedAnswer !== null ? 1 : 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          showResult && isCorrect 
                            ? 'bg-green-500' 
                            : showResult && isSelected && !isCorrect 
                            ? 'bg-red-500' 
                            : 'bg-gray-200'
                        }`}
                      >
                        {showResult && isCorrect && (
                          <CheckCircle className="w-5 h-5 text-white" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                        {!showResult && (
                          <span className="text-gray-600">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${
                  selectedAnswer === question.correctAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-900">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-900">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-700">
                  {question.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
