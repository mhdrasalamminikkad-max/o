import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, ExternalLink, X, CheckCircle } from 'lucide-react';
import { eventsAPI } from '../services/api';

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getUpcoming();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle RSVP
  const handleRSVP = async (eventId) => {
    try {
      const result = await eventsAPI.rsvp(eventId, 1); // Mock member ID
      setRsvpStatus(result);
      if (result.success) {
        // Update local state
        setEvents(prev => prev.map(event => 
          event.id === eventId 
            ? { ...event, attendees: event.attendees + 1 }
            : event
        ));
      }
    } catch (error) {
      console.error('Error RSVPing to event:', error);
    }
  };

  // Handle Google Calendar integration
  const handleAddToGoogleCalendar = (event) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-mutedBlue">Loading upcoming events...</p>
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
          Events Calendar
        </h2>
        <p className="text-xl text-mutedBlue max-w-3xl mx-auto">
          Join our book discussions, author meetups, and reading challenges. 
          Connect with fellow book lovers in our cozy virtual space.
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <EventCard 
              event={event} 
              onViewDetails={setSelectedEvent}
              onRSVP={handleRSVP}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Calendar className="h-16 w-16 text-mutedBlue/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mutedBlue mb-2">No upcoming events</h3>
          <p className="text-mutedBlue">Check back soon for new book discussions and meetups!</p>
        </motion.div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onRSVP={handleRSVP}
            onAddToCalendar={handleAddToGoogleCalendar}
          />
        )}
      </AnimatePresence>

      {/* RSVP Status Modal */}
      <AnimatePresence>
        {rsvpStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setRsvpStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                rsvpStatus.success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <CheckCircle className={`h-8 w-8 ${
                  rsvpStatus.success ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-forest mb-2">
                {rsvpStatus.success ? 'RSVP Successful!' : 'RSVP Failed'}
              </h3>
              <p className="text-mutedBlue mb-6">{rsvpStatus.message}</p>
              <button
                onClick={() => setRsvpStatus(null)}
                className="bg-forest text-cream px-6 py-2 rounded-full hover:bg-forest/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, onViewDetails, onRSVP }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Book Discussion':
        return 'bg-forest';
      case 'Casual Meetup':
        return 'bg-burnt';
      case 'Author Event':
        return 'bg-gold';
      case 'Challenge':
        return 'bg-mutedBlue';
      default:
        return 'bg-forest';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
      whileHover={{ y: -5 }}
    >
      {/* Event Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full ${getEventTypeColor(event.type)} flex items-center justify-center text-cream text-xl`}>
            {event.icon}
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-forest line-clamp-2">{event.title}</h3>
            <p className="text-sm text-mutedBlue">{event.type}</p>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 text-sm text-mutedBlue">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-mutedBlue">
          <Clock className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-mutedBlue">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-mutedBlue">
          <Users className="h-4 w-4" />
          <span>{event.attendees} / {event.maxAttendees} attendees</span>
        </div>
      </div>

      {/* Event Description */}
      <p className="text-sm text-forest mb-6 line-clamp-3">{event.description}</p>

      {/* Event Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(event)}
          className="flex-1 bg-forest/10 text-forest px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest/20 transition-colors"
        >
          View Details
        </button>
        <button
          onClick={() => onRSVP(event.id)}
          className="flex-1 bg-forest text-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors"
        >
          RSVP
        </button>
      </div>
    </motion.div>
  );
};

// Event Modal Component
const EventModal = ({ event, onClose, onRSVP, onAddToCalendar }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Book Discussion':
        return 'bg-forest';
      case 'Casual Meetup':
        return 'bg-burnt';
      case 'Author Event':
        return 'bg-gold';
      case 'Challenge':
        return 'bg-mutedBlue';
      default:
        return 'bg-forest';
    }
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
          
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 rounded-2xl ${getEventTypeColor(event.type)} flex items-center justify-center text-cream text-2xl`}>
              {event.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-serif font-bold text-forest mb-2">{event.title}</h2>
              <p className="text-mutedBlue">{event.type}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-forest" />
                <div>
                  <p className="font-semibold text-forest">{formatDate(event.date)}</p>
                  <p className="text-sm text-mutedBlue">Date</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-forest" />
                <div>
                  <p className="font-semibold text-forest">{event.time}</p>
                  <p className="text-sm text-mutedBlue">Time</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-forest" />
                <div>
                  <p className="font-semibold text-forest">{event.location}</p>
                  <p className="text-sm text-mutedBlue">Location</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-forest" />
                <div>
                  <p className="font-semibold text-forest">{event.attendees} / {event.maxAttendees}</p>
                  <p className="text-sm text-mutedBlue">Attendees</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-forest mb-3">About This Event</h3>
            <p className="text-mutedBlue leading-relaxed">{event.description}</p>
          </div>

          {/* Host Info */}
          <div className="bg-warmGray/30 rounded-2xl p-4 mb-8">
            <h4 className="font-semibold text-forest mb-2">Hosted by</h4>
            <p className="text-mutedBlue">{event.host}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onRSVP(event.id)}
              className="flex-1 bg-forest text-cream px-6 py-3 rounded-full font-semibold hover:bg-forest/90 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>RSVP to Event</span>
            </button>
            <button
              onClick={() => onAddToCalendar(event)}
              className="flex-1 bg-burnt text-cream px-6 py-3 rounded-full font-semibold hover:bg-burnt/90 transition-colors flex items-center justify-center space-x-2"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventsCalendar;
