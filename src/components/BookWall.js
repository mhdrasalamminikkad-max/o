import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, Search, BookOpen, Heart, MessageCircle } from 'lucide-react';
import { booksAPI } from '../services/api';

const BookWall = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await booksAPI.getAll();
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on active filter and search query
  useEffect(() => {
    let filtered = books;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'staff-picks':
        filtered = filtered.filter(book => book.isStaffPick);
        break;
      case 'trending':
        filtered = filtered.filter(book => book.isTrending);
        break;
      case 'fiction':
        filtered = filtered.filter(book => book.genre === 'Fiction');
        break;
      case 'sci-fi':
        filtered = filtered.filter(book => book.genre === 'Science Fiction');
        break;
      case 'fantasy':
        filtered = filtered.filter(book => book.genre === 'Fantasy');
        break;
      case 'memoir':
        filtered = filtered.filter(book => book.genre === 'Memoir');
        break;
      default:
        // Show all books
        break;
    }

    setFilteredBooks(filtered);
  }, [books, activeFilter, searchQuery]);

  const filters = [
    { id: 'all', label: 'All Books', count: books.length },
    { id: 'staff-picks', label: 'Staff Picks', count: books.filter(b => b.isStaffPick).length },
    { id: 'trending', label: 'Trending', count: books.filter(b => b.isTrending).length },
    { id: 'fiction', label: 'Fiction', count: books.filter(b => b.genre === 'Fiction').length },
    { id: 'sci-fi', label: 'Sci-Fi', count: books.filter(b => b.genre === 'Science Fiction').length },
    { id: 'fantasy', label: 'Fantasy', count: books.filter(b => b.genre === 'Fantasy').length },
    { id: 'memoir', label: 'Memoir', count: books.filter(b => b.genre === 'Memoir').length },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-gold fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-mutedBlue">Loading amazing books...</p>
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
          Book Recommendation Wall
        </h2>
        <p className="text-xl text-mutedBlue max-w-3xl mx-auto">
          Discover your next favorite read from our community's most beloved books. 
          Each recommendation comes with a personal note from a fellow book lover.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-mutedBlue" />
          <input
            type="text"
            placeholder="Search books, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-full bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-forest text-cream shadow-lg'
                  : 'bg-white/60 text-forest hover:bg-forest/10'
              }`}
            >
              {filter.label}
              <span className="ml-2 text-xs opacity-75">({filter.count})</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Books Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <BookCard book={book} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredBooks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <BookOpen className="h-16 w-16 text-mutedBlue/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mutedBlue mb-2">No books found</h3>
          <p className="text-mutedBlue">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

// Individual Book Card Component
const BookCard = ({ book }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-gold fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      className="relative h-96 cursor-pointer"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      whileHover={{ y: -5 }}
    >
      {/* Book Cover */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Book Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-serif font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-sm opacity-90 mb-2">{book.author}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {renderStars(book.rating)}
                <span className="text-sm ml-1">{book.rating}</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{book.genre}</span>
            </div>
          </div>

          {/* Staff Pick Badge */}
          {book.isStaffPick && (
            <div className="absolute top-3 right-3 bg-gold text-forest px-2 py-1 rounded-full text-xs font-bold">
              Staff Pick
            </div>
          )}

          {/* Trending Badge */}
          {book.isTrending && (
            <div className="absolute top-3 left-3 bg-burnt text-cream px-2 py-1 rounded-full text-xs font-bold">
              Trending
            </div>
          )}
        </div>

        {/* Back of card (Review) */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-forest to-burnt p-4 flex flex-col justify-center text-cream"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <Heart className="h-8 w-8 mx-auto mb-3 text-gold" />
            <h4 className="font-serif font-bold text-lg mb-3">Member Review</h4>
            <p className="text-sm leading-relaxed mb-4 line-clamp-4">{book.miniReview}</p>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <MessageCircle className="h-4 w-4" />
              <span>Read full review</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Member Note (Sticky Note Style) */}
      <motion.div
        className="absolute -bottom-4 -right-2 bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded-lg shadow-lg max-w-xs"
        initial={{ rotate: 5, scale: 0.9 }}
        animate={{ rotate: isFlipped ? 0 : 5, scale: isFlipped ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs text-forest leading-relaxed line-clamp-3">
          "{book.memberNote}"
        </p>
        <div className="text-xs text-mutedBlue mt-1">- Community Member</div>
      </motion.div>
    </motion.div>
  );
};

export default BookWall;
