import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Calendar, Award, MessageCircle, Menu, X, Volume2, VolumeX } from 'lucide-react';

// Import components
import Hero from './components/Hero';
import BookWall from './components/BookWall';
import CommunityLounge from './components/CommunityLounge';
import InteractiveZone from './components/InteractiveZone';
import EventsCalendar from './components/EventsCalendar';
import MemberProfiles from './components/MemberProfiles';
import Footer from './components/Footer';
import AmbientToggle from './components/AmbientToggle';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'interactive', label: 'Interactive', icon: Award },
    { id: 'profiles', label: 'Members', icon: MessageCircle },
  ];

  // Handle scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
      // Focus management for accessibility
      element.focus({ preventScroll: true });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Handle ambient sound toggle
  const toggleAmbient = () => {
    setIsAmbientOn(!isAmbientOn);
    // In a real app, this would control actual audio
    console.log('Ambient sounds:', !isAmbientOn ? 'ON' : 'OFF');
  };

  // Scroll spy for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="h-8 w-8 text-forest" />
              <span className="text-xl font-serif font-bold text-gradient">
                Readers' Community
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-forest text-cream shadow-lg'
                        : 'text-forest hover:bg-forest/10 hover:text-forest'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Ambient Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <AmbientToggle isOn={isAmbientOn} onToggle={toggleAmbient} />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-forest hover:bg-forest/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-forest text-cream'
                          : 'text-forest hover:bg-forest/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16" role="main">
        {/* Hero Section */}
        <section id="home" tabIndex="-1" aria-label="Hero section">
          <Hero onJoinClick={() => scrollToSection('books')} />
        </section>

        {/* Book Recommendation Wall */}
        <section id="books" className="py-20" tabIndex="-1" aria-label="Book recommendations">
          <BookWall />
        </section>

        {/* Community Lounge */}
        <section id="community" className="py-20 bg-warmGray/30" tabIndex="-1" aria-label="Community discussions">
          <CommunityLounge />
        </section>

        {/* Interactive Zone */}
        <section id="interactive" className="py-20" tabIndex="-1" aria-label="Interactive features">
          <InteractiveZone />
        </section>

        {/* Events Calendar */}
        <section id="events" className="py-20 bg-warmGray/30" tabIndex="-1" aria-label="Upcoming events">
          <EventsCalendar />
        </section>

        {/* Member Profiles */}
        <section id="profiles" className="py-20" tabIndex="-1" aria-label="Community members">
          <MemberProfiles />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
