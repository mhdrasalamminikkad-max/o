// Mock data for the Readers' Community Virtual Book Club

export const books = [
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    rating: 4.8,
    genre: "Fiction",
    memberNote: "This book completely swept me away! Evelyn's story is so compelling and beautifully written. Couldn't put it down! 💕",
    miniReview: "A captivating tale of ambition, love, and secrets. The character development is phenomenal.",
    isbn: "9781501139239",
    publishedYear: 2017,
    pages: 400,
    isStaffPick: true,
    isTrending: true
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    rating: 4.9,
    genre: "Science Fiction",
    memberNote: "Mind-blowing science fiction! Rocky is the best alien character ever created. Science + humor = perfection! 🚀",
    miniReview: "Brilliant blend of hard science and humor. Rocky will steal your heart!",
    isbn: "9780593135204",
    publishedYear: 2021,
    pages: 496,
    isStaffPick: true,
    isTrending: false
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    rating: 4.6,
    genre: "Fantasy",
    memberNote: "Such a beautiful exploration of life's infinite possibilities. Made me appreciate my own journey so much more. ✨",
    miniReview: "A thought-provoking journey through life's what-ifs. Perfect for anyone feeling lost.",
    isbn: "9780525559474",
    publishedYear: 2020,
    pages: 304,
    isStaffPick: false,
    isTrending: true
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    rating: 4.7,
    genre: "Memoir",
    memberNote: "Incredibly powerful memoir about education, family, and finding your own path. Tara's resilience is inspiring! 📚",
    miniReview: "A raw and powerful story of self-discovery through education.",
    isbn: "9780399590504",
    publishedYear: 2018,
    pages: 352,
    isStaffPick: true,
    isTrending: false
  },
  {
    id: 5,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    rating: 4.9,
    genre: "Historical Fiction",
    memberNote: "This book broke my heart in the best way possible. The love story between Patroclus and Achilles is so beautifully told. 💔",
    miniReview: "A stunning retelling of Greek mythology with incredible emotional depth.",
    isbn: "9780062060624",
    publishedYear: 2011,
    pages: 352,
    isStaffPick: false,
    isTrending: true
  },
  {
    id: 6,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    rating: 4.3,
    genre: "Science Fiction",
    memberNote: "Ishiguro's writing is pure poetry. Klara's perspective on humanity is both innocent and profound. 🤖",
    miniReview: "A gentle yet profound exploration of AI consciousness and human connection.",
    isbn: "9780593318171",
    publishedYear: 2021,
    pages: 320,
    isStaffPick: false,
    isTrending: false
  }
];

export const members = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-01-15",
    favoriteGenres: ["Fiction", "Fantasy", "Romance"],
    currentReads: ["The Seven Husbands of Evelyn Hugo", "The Midnight Library"],
    badges: ["Page Turner", "Night Owl", "Genre Explorer"],
    booksRead: 47,
    bio: "Book lover, coffee enthusiast, and amateur book reviewer. Always looking for my next great read!",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2022-11-03",
    favoriteGenres: ["Science Fiction", "Non-fiction", "Biography"],
    currentReads: ["Project Hail Mary"],
    badges: ["Page Turner", "Science Enthusiast", "Early Bird"],
    booksRead: 89,
    bio: "Sci-fi enthusiast and space exploration advocate. Love books that make me think about the universe!",
    location: "Austin, TX"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    joinDate: "2023-03-22",
    favoriteGenres: ["Memoir", "Historical Fiction", "Literary Fiction"],
    currentReads: ["Educated", "The Song of Achilles"],
    badges: ["Genre Explorer", "Book Club Leader", "Night Owl"],
    booksRead: 34,
    bio: "Passionate about stories that explore the human experience. Love hosting book discussions!",
    location: "Portland, OR"
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "2022-08-14",
    favoriteGenres: ["Mystery", "Thriller", "Crime Fiction"],
    currentReads: ["The Midnight Library"],
    badges: ["Page Turner", "Mystery Master", "Early Bird"],
    booksRead: 156,
    bio: "Mystery and thriller addict! Always trying to solve the case before the detective does.",
    location: "New York, NY"
  }
];

export const events = [
  {
    id: 1,
    title: "Book Talk: The Alchemist",
    date: "2024-01-26",
    time: "8:00 PM",
    type: "Book Discussion",
    icon: "📖",
    description: "Join us for a deep dive into Paulo Coelho's timeless classic. We'll explore themes of destiny, dreams, and personal legend.",
    attendees: 23,
    maxAttendees: 30,
    location: "Virtual (Zoom)",
    host: "Emma Rodriguez",
    isRecurring: false
  },
  {
    id: 2,
    title: "Coffee & Classics",
    date: "2024-01-28",
    time: "10:00 AM",
    type: "Casual Meetup",
    icon: "☕",
    description: "Relaxed morning discussion about classic literature. Bring your favorite coffee and thoughts!",
    attendees: 15,
    maxAttendees: 20,
    location: "Virtual (Gather)",
    host: "Sarah Chen",
    isRecurring: true
  },
  {
    id: 3,
    title: "Author Q&A: New Releases",
    date: "2024-02-02",
    time: "7:00 PM",
    type: "Author Event",
    icon: "✍️",
    description: "Meet debut authors and discover your next favorite book! Q&A session with three exciting new voices.",
    attendees: 45,
    maxAttendees: 50,
    location: "Virtual (YouTube Live)",
    host: "Marcus Johnson",
    isRecurring: false
  },
  {
    id: 4,
    title: "Reading Challenge Kickoff",
    date: "2024-02-05",
    time: "6:30 PM",
    type: "Challenge",
    icon: "🏆",
    description: "Launch of our 2024 Reading Challenge! 12 books in 12 months with themed categories.",
    attendees: 67,
    maxAttendees: 100,
    location: "Virtual (Discord)",
    host: "David Kim",
    isRecurring: false
  }
];

export const communityPosts = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Just finished 'The Seven Husbands of Evelyn Hugo' and WOW! That ending completely took my breath away. Anyone else still processing it? 💕",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 8,
    type: "discussion"
  },
  {
    id: 2,
    author: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Looking for sci-fi recommendations! Just finished 'Project Hail Mary' and need something equally mind-bending. What should I read next? 🚀",
    timestamp: "5 hours ago",
    likes: 7,
    comments: 15,
    type: "recommendation"
  },
  {
    id: 3,
    author: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Book club meeting this Friday is going to be amazing! We're discussing 'The Midnight Library' - can't wait to hear everyone's thoughts! ✨",
    timestamp: "1 day ago",
    likes: 9,
    comments: 5,
    type: "announcement"
  },
  {
    id: 4,
    author: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Just discovered this amazing indie bookstore in Brooklyn! They have the most incredible rare book collection. Anyone else love hunting for hidden gems? 📚",
    timestamp: "2 days ago",
    likes: 18,
    comments: 12,
    type: "discussion"
  }
];

export const quotes = [
  "A room without books is like a body without a soul. - Cicero",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
  "There is no friend as loyal as a book. - Ernest Hemingway",
  "Books are a uniquely portable magic. - Stephen King",
  "Reading is to the mind what exercise is to the body. - Joseph Addison",
  "A book is a dream that you hold in your hand. - Neil Gaiman",
  "The reading of all good books is like conversation with the finest minds of past centuries. - René Descartes",
  "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors. - Charles William Eliot"
];

export const badges = [
  {
    id: 1,
    name: "Page Turner",
    description: "Read 10 books in a month",
    icon: "📖",
    color: "bg-gold",
    isEarned: true
  },
  {
    id: 2,
    name: "Night Owl",
    description: "Stay up past midnight reading",
    icon: "🦉",
    color: "bg-forest",
    isEarned: true
  },
  {
    id: 3,
    name: "Genre Explorer",
    description: "Read books from 5 different genres",
    icon: "🗺️",
    color: "bg-burnt",
    isEarned: true
  },
  {
    id: 4,
    name: "Book Club Leader",
    description: "Host 3 book discussions",
    icon: "👑",
    color: "bg-mutedBlue",
    isEarned: false
  },
  {
    id: 5,
    name: "Science Enthusiast",
    description: "Read 5 science fiction books",
    icon: "🔬",
    color: "bg-gold",
    isEarned: false
  },
  {
    id: 6,
    name: "Early Bird",
    description: "Read before 7 AM for 7 days",
    icon: "🌅",
    color: "bg-burnt",
    isEarned: false
  }
];

export const readingChallenges = [
  {
    id: 1,
    title: "2024 Reading Challenge",
    description: "Read 12 books in 12 months with themed categories",
    progress: 8,
    total: 12,
    categories: [
      "A book by a debut author",
      "A book with a color in the title",
      "A book set in a different country",
      "A book with a one-word title",
      "A book recommended by a friend",
      "A book that's been on your TBR for over a year",
      "A book by an author you've never read",
      "A book with a beautiful cover",
      "A book that made you laugh",
      "A book that made you cry",
      "A book you can finish in a day",
      "A book that's been adapted to film"
    ],
    completedCategories: 8,
    startDate: "2024-01-01",
    endDate: "2024-12-31"
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal reading environment?",
    options: [
      "Cozy armchair by the fireplace",
      "Hammock in a sunny garden",
      "Café with ambient noise",
      "Quiet library corner"
    ],
    results: {
      "Cozy armchair by the fireplace": "Jane Eyre",
      "Hammock in a sunny garden": "The Secret Garden",
      "Café with ambient noise": "The Great Gatsby",
      "Quiet library corner": "The Book Thief"
    }
  },
  {
    id: 2,
    question: "What motivates you most?",
    options: [
      "Love and relationships",
      "Adventure and discovery",
      "Justice and truth",
      "Knowledge and wisdom"
    ],
    results: {
      "Love and relationships": "Pride and Prejudice",
      "Adventure and discovery": "The Hobbit",
      "Justice and truth": "To Kill a Mockingbird",
      "Knowledge and wisdom": "The Alchemist"
    }
  },
  {
    id: 3,
    question: "Your perfect weekend involves:",
    options: [
      "A long, leisurely read",
      "Exploring new places",
      "Deep conversations with friends",
      "Learning something new"
    ],
    results: {
      "A long, leisurely read": "Little Women",
      "Exploring new places": "Around the World in 80 Days",
      "Deep conversations with friends": "The Catcher in the Rye",
      "Learning something new": "Sapiens"
    }
  }
];
