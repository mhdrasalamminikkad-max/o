import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Reply, Plus, Pin, Users, Coffee } from 'lucide-react';
import { communityAPI } from '../services/api';

const CommunityLounge = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch community posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await communityAPI.getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle new post submission
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const postData = {
        author: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content: newPost,
        type: "discussion"
      };

      const newPostData = await communityAPI.createPost(postData);
      setPosts(prev => [newPostData, ...prev]);
      setNewPost('');
      setShowNewPost(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Handle like post
  const handleLikePost = async (postId) => {
    try {
      const result = await communityAPI.likePost(postId);
      if (result.success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes: result.likes }
            : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-mutedBlue">Loading community posts...</p>
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
          Community Lounge
        </h2>
        <p className="text-xl text-mutedBlue max-w-3xl mx-auto">
          Share your thoughts, ask questions, and connect with fellow book lovers. 
          What story warmed your heart this week?
        </p>
      </motion.div>

      {/* Corkboard Background */}
      <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-8 shadow-2xl">
        {/* Corkboard texture */}
        <div className="absolute inset-0 rounded-3xl opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='20' cy='20' r='1' fill='%238B4513' opacity='0.3'/%3E%3Ccircle cx='80' cy='30' r='1' fill='%238B4513' opacity='0.3'/%3E%3Ccircle cx='40' cy='60' r='1' fill='%238B4513' opacity='0.3'/%3E%3Ccircle cx='70' cy='80' r='1' fill='%238B4513' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}></div>

        {/* New Post Button */}
        <motion.button
          onClick={() => setShowNewPost(!showNewPost)}
          className="absolute top-4 right-4 bg-forest text-cream px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </motion.button>

        {/* New Post Form */}
        <AnimatePresence>
          {showNewPost && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-8 sticky-note"
            >
              <form onSubmit={handleSubmitPost} className="p-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind, booklover? Share a thought, ask a question, or recommend a book..."
                  className="w-full h-24 p-3 border border-yellow-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-forest/50"
                  autoFocus
                />
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="px-4 py-2 text-mutedBlue hover:text-forest transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-forest text-cream rounded-lg hover:bg-forest/90 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: Math.random() * 10 - 5 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
              >
                <CommunityPost post={post} onLike={handleLikePost} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <MessageCircle className="h-16 w-16 text-mutedBlue/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-mutedBlue mb-2">No posts yet</h3>
            <p className="text-mutedBlue">Be the first to start a conversation!</p>
          </motion.div>
        )}
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
          <Users className="h-8 w-8 text-forest mx-auto mb-3" />
          <div className="text-2xl font-bold text-forest mb-1">1,234</div>
          <div className="text-mutedBlue">Active Members</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
          <MessageCircle className="h-8 w-8 text-burnt mx-auto mb-3" />
          <div className="text-2xl font-bold text-forest mb-1">3,456</div>
          <div className="text-mutedBlue">Discussions</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
          <Coffee className="h-8 w-8 text-gold mx-auto mb-3" />
          <div className="text-2xl font-bold text-forest mb-1">89</div>
          <div className="text-mutedBlue">Book Clubs</div>
        </div>
      </motion.div>
    </div>
  );
};

// Individual Community Post Component
const CommunityPost = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      onLike(post.id);
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'discussion':
        return 'border-blue-400 bg-blue-50';
      case 'recommendation':
        return 'border-green-400 bg-green-50';
      case 'announcement':
        return 'border-purple-400 bg-purple-50';
      default:
        return 'border-yellow-400 bg-yellow-50';
    }
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'discussion':
        return <MessageCircle className="h-4 w-4" />;
      case 'recommendation':
        return <Heart className="h-4 w-4" />;
      case 'announcement':
        return <Pin className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      className={`sticky-note p-4 max-w-sm ${getPostTypeColor(post.type)}`}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-forest text-sm truncate">{post.author}</h4>
          <div className="flex items-center space-x-1 text-xs text-mutedBlue">
            {getPostTypeIcon(post.type)}
            <span className="capitalize">{post.type}</span>
            <span>•</span>
            <span>{post.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-forest text-sm leading-relaxed mb-4 line-clamp-4">
        {post.content}
      </p>

      {/* Post Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-xs transition-colors ${
              isLiked ? 'text-burnt' : 'text-mutedBlue hover:text-burnt'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-xs text-mutedBlue hover:text-forest transition-colors">
            <Reply className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityLounge;
