import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Trophy, Star, Target, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { quizAPI, badgesAPI, challengesAPI } from '../services/api';

const InteractiveZone = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [quizResult, setQuizResult] = useState(null);
  const [badges, setBadges] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [badgesData, challengeData] = await Promise.all([
          badgesAPI.getAll(),
          challengesAPI.getCurrent()
        ]);
        setBadges(badgesData);
        setChallenge(challengeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: 'quiz', label: 'Book Quiz', icon: Sparkles },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'challenge', label: 'Reading Challenge', icon: Trophy },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-mutedBlue">Loading interactive features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
          Interactive Zone
        </h2>
        <p className="text-xl text-mutedBlue max-w-3xl mx-auto">
          Test your book knowledge, earn badges, and take on reading challenges. 
          Join the next Book Talk — we'll bring the tea ☕
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-forest text-cream shadow-lg'
                    : 'text-forest hover:bg-forest/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'quiz' && <BookQuiz onResult={setQuizResult} result={quizResult} />}
          {activeTab === 'badges' && <BadgesSection badges={badges} />}
          {activeTab === 'challenge' && <ReadingChallenge challenge={challenge} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Book Quiz Component
const BookQuiz = ({ onResult, result }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await quizAPI.getQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer
      }));
      
      const result = await quizAPI.submitAnswers(answerArray);
      onResult(result);
      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    onResult(null);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
        <p className="mt-4 text-mutedBlue">Loading quiz...</p>
      </div>
    );
  }

  if (isComplete && result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-gradient-to-br from-forest to-burnt rounded-3xl p-8 text-cream shadow-2xl">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-gold" />
          <h3 className="text-3xl font-serif font-bold mb-4">Quiz Complete!</h3>
          <h4 className="text-xl font-semibold mb-4">You're most like the protagonist from:</h4>
          <div className="text-2xl font-bold text-gold mb-6">"{result.result}"</div>
          <p className="text-lg leading-relaxed mb-8">{result.description}</p>
          <button
            onClick={handleRestart}
            className="bg-cream text-forest px-8 py-3 rounded-full font-semibold hover:bg-cream/90 transition-colors flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      </motion.div>
    );
  }

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-mutedBlue mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-warmGray/30 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-forest to-burnt h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8">
        <h3 className="text-2xl font-serif font-bold text-forest mb-8 text-center">
          {question.question}
        </h3>
        
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(question.id, option)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                answers[question.id] === option
                  ? 'bg-forest text-cream shadow-lg'
                  : 'bg-white/60 text-forest hover:bg-forest/10 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers[question.id] === option
                    ? 'border-cream bg-cream/20'
                    : 'border-forest'
                }`}>
                  {answers[question.id] === option && (
                    <CheckCircle className="h-4 w-4 text-forest" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              answers[question.id]
                ? 'bg-forest text-cream hover:bg-forest/90 shadow-lg'
                : 'bg-mutedBlue/30 text-mutedBlue cursor-not-allowed'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Get My Result'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Badges Section Component
const BadgesSection = ({ badges }) => {
  const earnedBadges = badges.filter(badge => badge.isEarned);
  const availableBadges = badges.filter(badge => !badge.isEarned);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Earned Badges */}
      <div className="mb-12">
        <h3 className="text-2xl font-serif font-bold text-forest mb-6 text-center">
          Your Badges ({earnedBadges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gold to-burnt rounded-2xl p-6 text-cream shadow-xl"
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h4 className="text-xl font-bold mb-2">{badge.name}</h4>
                <p className="text-sm opacity-90">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Badges */}
      <div>
        <h3 className="text-2xl font-serif font-bold text-forest mb-6 text-center">
          Available Badges ({availableBadges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            >
              <div className="text-center">
                <div className="text-4xl mb-3 opacity-50">{badge.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-mutedBlue">{badge.name}</h4>
                <p className="text-sm text-mutedBlue">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reading Challenge Component
const ReadingChallenge = ({ challenge }) => {
  if (!challenge) return null;

  const progressPercentage = (challenge.progress / challenge.total) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-forest to-burnt rounded-3xl p-8 text-cream shadow-2xl">
        <div className="text-center mb-8">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-gold" />
          <h3 className="text-3xl font-serif font-bold mb-2">{challenge.title}</h3>
          <p className="text-lg opacity-90">{challenge.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{challenge.progress} / {challenge.total} books</span>
          </div>
          <div className="w-full bg-cream/20 rounded-full h-4">
            <motion.div
              className="bg-gradient-to-r from-gold to-cream h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="text-center mt-2 text-sm">
            {Math.round(progressPercentage)}% Complete
          </div>
        </div>

        {/* Challenge Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenge.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                index < challenge.completedCategories
                  ? 'border-gold bg-gold/20'
                  : 'border-cream/30 bg-cream/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                {index < challenge.completedCategories ? (
                  <CheckCircle className="h-5 w-5 text-gold" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-cream/50" />
                )}
                <span className="text-sm">{category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Challenge Dates */}
        <div className="mt-8 text-center text-sm opacity-75">
          {challenge.startDate} - {challenge.endDate}
        </div>
      </div>
    </div>
  );
};

export default InteractiveZone;
