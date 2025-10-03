import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, Mail, Twitter, Instagram, Facebook, Coffee, Users, Calendar, Award } from 'lucide-react';
import { quotesAPI } from '../services/api';

const Footer = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const quote = await quotesAPI.getRandom();
        setCurrentQuote(quote);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  const footerLinks = {
    about: [
      { label: 'Our Story', href: '#' },
      { label: 'Mission', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    community: [
      { label: 'Community Guidelines', href: '#' },
      { label: 'Code of Conduct', href: '#' },
      { label: 'Safety Center', href: '#' },
      { label: 'Report Issue', href: '#' },
    ],
    resources: [
      { label: 'Book Recommendations', href: '#' },
      { label: 'Reading Lists', href: '#' },
      { label: 'Author Interviews', href: '#' },
      { label: 'Book Reviews', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-forest to-burnt text-cream overflow-hidden">
      {/* Bookshelf Background */}
      <div className="absolute inset-0 bookshelf-bg opacity-10"></div>
      
      {/* Fairy Lights Effect */}
      <div className="absolute inset-0 bg-fairy-lights opacity-20"></div>

      <div className="relative z-10">
        {/* Rotating Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 border-b border-cream/20"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="h-12 w-12 mx-auto mb-6 text-gold" />
                <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-4">
                  "{currentQuote}"
                </blockquote>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <BookOpen className="h-10 w-10 text-gold" />
                    <span className="text-2xl font-serif font-bold">Readers' Community</span>
                  </div>
                  <p className="text-cream/80 leading-relaxed mb-6 max-w-md">
                    Where stories connect hearts. Join our cozy digital reading nook and discover 
                    amazing books with fellow book lovers from around the world.
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          className="w-10 h-10 bg-cream/20 rounded-full flex items-center justify-center hover:bg-cream/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* About Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <ul className="space-y-3">
                  {footerLinks.about.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-cream/80 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Community</h3>
                <ul className="space-y-3">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-cream/80 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-cream/80 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-cream/20"
            >
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-serif font-bold mb-4">Stay in the Loop</h3>
                <p className="text-cream/80 mb-6">
                  Get weekly book recommendations, community highlights, and exclusive author interviews 
                  delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-full text-forest placeholder-mutedBlue focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button className="bg-gold text-forest px-6 py-3 rounded-full font-semibold hover:bg-gold/90 transition-colors flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-6 border-t border-cream/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-cream/60 text-sm">
                © 2024 Readers' Community. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-cream/60 hover:text-gold transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-4 h-4 bg-gold/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-3 h-3 bg-cream/40 rounded-full"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-2 h-2 bg-gold/50 rounded-full"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
