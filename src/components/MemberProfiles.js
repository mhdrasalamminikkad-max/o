import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, Award, MapPin, Calendar, Edit3, X, Save, Star, Heart } from 'lucide-react';
import { membersAPI } from '../services/api';

const MemberProfiles = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch members on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersAPI.getAll();
        setMembers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Handle edit member
  const handleEditMember = (member) => {
    setEditingMember({ ...member });
    setShowEditModal(true);
  };

  // Handle save member changes
  const handleSaveMember = () => {
    if (editingMember) {
      setMembers(prev => prev.map(member => 
        member.id === editingMember.id ? editingMember : member
      ));
      setShowEditModal(false);
      setEditingMember(null);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditingMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-mutedBlue">Loading community members...</p>
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
          Community Members
        </h2>
        <p className="text-xl text-mutedBlue max-w-3xl mx-auto">
          Meet the amazing book lovers who make our community special. 
          Discover their favorite reads, current obsessions, and reading journeys.
        </p>
      </motion.div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <MemberCard 
              member={member} 
              onViewDetails={setSelectedMember}
              onEdit={handleEditMember}
            />
          </motion.div>
        ))}
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            onEdit={handleEditMember}
          />
        )}
      </AnimatePresence>

      {/* Edit Member Modal */}
      <AnimatePresence>
        {showEditModal && editingMember && (
          <EditMemberModal
            member={editingMember}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveMember}
            onChange={handleInputChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member, onViewDetails, onEdit }) => {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
      whileHover={{ y: -5 }}
    >
      {/* Member Avatar and Basic Info */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h3 className="font-serif font-bold text-lg text-forest mb-1">{member.name}</h3>
        <p className="text-sm text-mutedBlue">{member.location}</p>
        <p className="text-xs text-mutedBlue">Joined {formatJoinDate(member.joinDate)}</p>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-forest">{member.booksRead}</div>
          <div className="text-xs text-mutedBlue">Books Read</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-forest">{member.badges.length}</div>
          <div className="text-xs text-mutedBlue">Badges</div>
        </div>
      </div>

      {/* Favorite Genres */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-forest mb-2">Favorite Genres</h4>
        <div className="flex flex-wrap gap-1">
          {member.favoriteGenres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="text-xs bg-forest/10 text-forest px-2 py-1 rounded-full"
            >
              {genre}
            </span>
          ))}
          {member.favoriteGenres.length > 3 && (
            <span className="text-xs text-mutedBlue">+{member.favoriteGenres.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Current Reads */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-forest mb-2">Currently Reading</h4>
        <div className="space-y-1">
          {member.currentReads.slice(0, 2).map((book, index) => (
            <p key={index} className="text-xs text-mutedBlue line-clamp-1">{book}</p>
          ))}
          {member.currentReads.length > 2 && (
            <p className="text-xs text-mutedBlue">+{member.currentReads.length - 2} more</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(member)}
          className="flex-1 bg-forest/10 text-forest px-3 py-2 rounded-lg text-sm font-medium hover:bg-forest/20 transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={() => onEdit(member)}
          className="bg-burnt/10 text-burnt p-2 rounded-lg hover:bg-burnt/20 transition-colors"
        >
          <Edit3 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Member Modal Component
const MemberModal = ({ member, onClose, onEdit }) => {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-8 border-b border-warmGray/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-warmGray/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-serif font-bold text-forest mb-2">{member.name}</h2>
            <p className="text-mutedBlue">{member.location}</p>
            <p className="text-sm text-mutedBlue">Member since {formatJoinDate(member.joinDate)}</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-forest mb-3">About</h3>
            <p className="text-mutedBlue leading-relaxed">{member.bio}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">{member.booksRead}</div>
              <div className="text-sm text-mutedBlue">Books Read</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">{member.badges.length}</div>
              <div className="text-sm text-mutedBlue">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest">{member.currentReads.length}</div>
              <div className="text-sm text-mutedBlue">Currently Reading</div>
            </div>
          </div>

          {/* Favorite Genres */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-forest mb-3">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              {member.favoriteGenres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-forest/10 text-forest px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Current Reads */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-forest mb-3">Currently Reading</h3>
            <div className="space-y-2">
              {member.currentReads.map((book, index) => (
                <div key={index} className="flex items-center space-x-2 text-mutedBlue">
                  <BookOpen className="h-4 w-4" />
                  <span>{book}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-forest mb-3">Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {member.badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gold to-burnt rounded-xl p-3 text-cream text-center"
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-sm font-semibold">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => onEdit(member)}
              className="flex-1 bg-forest text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest/90 transition-colors flex items-center justify-center space-x-2"
            >
              <Edit3 className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
            <button
              className="flex-1 bg-burnt text-cream px-6 py-3 rounded-full font-semibold hover:bg-burnt/90 transition-colors flex items-center justify-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Follow</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Edit Member Modal Component
const EditMemberModal = ({ member, onClose, onSave, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-warmGray/20">
          <h2 className="text-xl font-serif font-bold text-forest">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warmGray/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Name</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => onChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-warmGray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/50"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Bio</label>
              <textarea
                value={member.bio}
                onChange={(e) => onChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-warmGray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/50 resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Location</label>
              <input
                type="text"
                value={member.location}
                onChange={(e) => onChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-warmGray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/50"
              />
            </div>

            {/* Favorite Genres */}
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Favorite Genres (comma-separated)</label>
              <input
                type="text"
                value={member.favoriteGenres.join(', ')}
                onChange={(e) => onChange('favoriteGenres', e.target.value.split(', ').filter(g => g.trim()))}
                className="w-full px-4 py-3 border border-warmGray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/50"
                placeholder="Fiction, Fantasy, Romance"
              />
            </div>

            {/* Current Reads */}
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Currently Reading (comma-separated)</label>
              <input
                type="text"
                value={member.currentReads.join(', ')}
                onChange={(e) => onChange('currentReads', e.target.value.split(', ').filter(b => b.trim()))}
                className="w-full px-4 py-3 border border-warmGray/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/50"
                placeholder="The Seven Husbands of Evelyn Hugo, Project Hail Mary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-warmGray/20 text-forest px-6 py-3 rounded-full font-semibold hover:bg-warmGray/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-forest text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest/90 transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MemberProfiles;
