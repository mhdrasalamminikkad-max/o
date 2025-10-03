// Mock API service for the Readers' Community

import { books, members, events, communityPosts, quotes, badges, readingChallenges, quizQuestions } from '../mock/data';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Books API
export const booksAPI = {
  getAll: async () => {
    await delay(300);
    return books;
  },
  
  getById: async (id) => {
    await delay(200);
    return books.find(book => book.id === parseInt(id));
  },
  
  getByGenre: async (genre) => {
    await delay(200);
    return books.filter(book => book.genre === genre);
  },
  
  getStaffPicks: async () => {
    await delay(200);
    return books.filter(book => book.isStaffPick);
  },
  
  getTrending: async () => {
    await delay(200);
    return books.filter(book => book.isTrending);
  },
  
  search: async (query) => {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery)
    );
  }
};

// Members API
export const membersAPI = {
  getAll: async () => {
    await delay(300);
    return members;
  },
  
  getById: async (id) => {
    await delay(200);
    return members.find(member => member.id === parseInt(id));
  },
  
  getTopReaders: async () => {
    await delay(200);
    return members.sort((a, b) => b.booksRead - a.booksRead);
  }
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    await delay(300);
    return events;
  },
  
  getById: async (id) => {
    await delay(200);
    return events.find(event => event.id === parseInt(id));
  },
  
  getUpcoming: async () => {
    await delay(200);
    const today = new Date();
    return events.filter(event => new Date(event.date) >= today);
  },
  
  rsvp: async (eventId, memberId) => {
    await delay(500);
    // Simulate RSVP logic
    const event = events.find(e => e.id === parseInt(eventId));
    if (event && event.attendees < event.maxAttendees) {
      event.attendees += 1;
      return { success: true, message: "Successfully RSVP'd!" };
    }
    return { success: false, message: "Event is full or not found." };
  }
};

// Community API
export const communityAPI = {
  getPosts: async () => {
    await delay(300);
    return communityPosts;
  },
  
  createPost: async (post) => {
    await delay(500);
    const newPost = {
      id: communityPosts.length + 1,
      ...post,
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };
    communityPosts.unshift(newPost);
    return newPost;
  },
  
  likePost: async (postId) => {
    await delay(200);
    const post = communityPosts.find(p => p.id === parseInt(postId));
    if (post) {
      post.likes += 1;
      return { success: true, likes: post.likes };
    }
    return { success: false };
  }
};

// Quotes API
export const quotesAPI = {
  getRandom: async () => {
    await delay(100);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },
  
  getAll: async () => {
    await delay(200);
    return quotes;
  }
};

// Badges API
export const badgesAPI = {
  getAll: async () => {
    await delay(200);
    return badges;
  },
  
  getEarned: async () => {
    await delay(200);
    return badges.filter(badge => badge.isEarned);
  }
};

// Reading Challenges API
export const challengesAPI = {
  getCurrent: async () => {
    await delay(200);
    return readingChallenges[0]; // Return the 2024 challenge
  },
  
  updateProgress: async (challengeId, progress) => {
    await delay(300);
    const challenge = readingChallenges.find(c => c.id === parseInt(challengeId));
    if (challenge) {
      challenge.progress = progress;
      challenge.completedCategories = Math.min(progress, challenge.total);
      return { success: true, challenge };
    }
    return { success: false };
  }
};

// Quiz API
export const quizAPI = {
  getQuestions: async () => {
    await delay(200);
    return quizQuestions;
  },
  
  submitAnswers: async (answers) => {
    await delay(500);
    // Simple scoring logic - find the most common result
    const results = answers.map(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      return question ? question.results[answer.answer] : null;
    }).filter(Boolean);
    
    // Count occurrences
    const counts = results.reduce((acc, result) => {
      acc[result] = (acc[result] || 0) + 1;
      return acc;
    }, {});
    
    // Find the most common result
    const topResult = Object.keys(counts).reduce((a, b) => 
      counts[a] > counts[b] ? a : b
    );
    
    return {
      result: topResult,
      description: `Based on your answers, you're most like the protagonist from "${topResult}"! This classic novel's themes and character development align with your reading preferences and personality.`
    };
  }
};

// Ambient Sounds API (mock)
export const ambientAPI = {
  getSounds: async () => {
    await delay(100);
    return [
      { id: 1, name: "Café Ambience", url: "/sounds/cafe.mp3", icon: "☕" },
      { id: 2, name: "Page Turning", url: "/sounds/pages.mp3", icon: "📖" },
      { id: 3, name: "Rain & Thunder", url: "/sounds/rain.mp3", icon: "🌧️" },
      { id: 4, name: "Fireplace", url: "/sounds/fireplace.mp3", icon: "🔥" }
    ];
  }
};
