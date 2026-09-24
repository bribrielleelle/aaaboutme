export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  category: 'School Projects' | 'Digital Art' | 'Photography' | 'Achievements';
  caption: string;
  imageUrl: string;
  date: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  genre: string;
  favorite: boolean;
}

export interface FutureGoal {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'Education' | 'Career' | 'Personal' | 'Skill';
  status: 'In Progress' | 'Upcoming' | 'Milestone';
}

export interface SiteContent {
  // Bio & Identity
  name: string;
  title: string;
  subtitle: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  profilePhotoUrl: string;
  profilePhotoCaption: string;
  
  // Contact & Socials
  email: string;
  location: string;
  socials: {
    instagram: string;
    github: string;
    linkedin: string;
    twitter: string;
    spotify: string;
  };

  // Phase 1 Layout Decisions
  layoutPreferences: {
    photoPosition: 'right' | 'left' | 'top';
    textAlign: 'left' | 'center';
    contactStyle: 'two-column' | 'boxed-card' | 'minimalist';
    accentTheme: 'pastel-dual' | 'soft-blue' | 'pastel-pink';
  };

  // Media
  mediaList: MediaItem[];

  // Music
  musicList: SongItem[];
  currentlyPlayingId: string;

  // Future
  futureGoals: FutureGoal[];
  careerAspiration: string;
  dreamCollege: string;
  favoriteQuote: string;
}

export const defaultSiteContent: SiteContent = {
  name: 'Brielle Davis',
  title: 'High School Student & Aspiring Web Developer',
  subtitle: 'Exploring code, creative media, and future horizons one project at a time.',
  bioParagraph1: "Hi, I'm Brielle Davis! I am a passionate high school student taking my first deep dive into web development and digital design. I love taking ideas from imagination to reality using code, and exploring how modern technology can empower personal storytelling.",
  bioParagraph2: "Beyond programming, my world revolves around music, creative media, and planning for an exciting future in technology and design. This website serves as my digital home and living portfolio for everything I am creating and learning.",
  bioParagraph3: "When I am not coding or studying, you can find me discovering new tracks, curating playlists, experimenting with visual arts, and preparing for college life.",
  profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  profilePhotoCaption: 'Brielle Davis — High School Portfolio & Creative Space',

  email: 'brielledavis919@gmail.com',
  location: 'United States',
  socials: {
    instagram: 'https://instagram.com',
    github: 'https://github.com/bribrielleelle',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    spotify: 'https://spotify.com'
  },

  layoutPreferences: {
    photoPosition: 'right',
    textAlign: 'left',
    contactStyle: 'two-column',
    accentTheme: 'pastel-dual'
  },

  mediaList: [
    {
      id: 'm1',
      title: 'First Web Project Prototype',
      category: 'School Projects',
      caption: 'Initial responsive layout wireframes and aesthetic color studies utilizing pastel palettes (#95a9e8 and #fcbbfa).',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      date: 'Fall 2026'
    },
    {
      id: 'm2',
      title: 'Digital Art & Palette Explorations',
      category: 'Digital Art',
      caption: 'Graphic experimentations harmonizing soft periwinkle blue (#95a9e8) and pastel rose (#fcbbfa).',
      imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
      date: '2026'
    },
    {
      id: 'm3',
      title: 'Sunset Horizon Photography',
      category: 'Photography',
      caption: 'Golden hour captures focusing on natural light gradients, architectural lines, and atmospheric balance.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      date: 'Summer 2026'
    },
    {
      id: 'm4',
      title: 'Academic Showcase & STEM Presentation',
      category: 'Achievements',
      caption: 'Presenting research findings and interactive digital assets at the regional high school student STEM showcase.',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      date: 'Spring 2026'
    },
    {
      id: 'm5',
      title: 'UI Component Design System in Figma',
      category: 'Digital Art',
      caption: 'Interactive user interface buttons, navigation headers, and responsive cards crafted for modern web accessibility.',
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
      date: 'Fall 2026'
    },
    {
      id: 'm6',
      title: 'Robotics & Web Club Hackathon Victory',
      category: 'Achievements',
      caption: 'Awarded 1st place in the youth collaborative hackathon for building a community resource discovery prototype.',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      date: 'Winter 2026'
    }
  ],

  musicList: [
    {
      id: 's1',
      title: 'Golden Hour Memories',
      artist: 'Pastel Dreamers',
      album: 'Vivid Horizons',
      duration: '3:24',
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      genre: 'Indie Pop',
      favorite: true
    },
    {
      id: 's2',
      title: 'Midnight Coding Flow',
      artist: 'Subtle Waves',
      album: 'Lo-Fi Chill & Focus',
      duration: '2:48',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
      genre: 'Lo-Fi / Ambient',
      favorite: true
    },
    {
      id: 's3',
      title: 'Electric Euphoria',
      artist: 'Nova & The Skies',
      album: 'Daylight Echoes',
      duration: '3:52',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80',
      genre: 'Synth Wave',
      favorite: false
    },
    {
      id: 's4',
      title: 'Acoustic Sunday Reflection',
      artist: 'Briar Hill',
      album: 'Quiet Strings',
      duration: '3:10',
      coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=400&q=80',
      genre: 'Acoustic Folk',
      favorite: true
    },
    {
      id: 's5',
      title: 'Pastel Cloud Nine',
      artist: 'Luna Drift',
      album: 'Soft Horizons',
      duration: '3:05',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      genre: 'Dream Pop',
      favorite: true
    },
    {
      id: 's6',
      title: 'Neon Coffee Break',
      artist: 'Kira Beatmakers',
      album: 'City Skylines',
      duration: '2:35',
      coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80',
      genre: 'Lo-Fi / Ambient',
      favorite: false
    }
  ],
  currentlyPlayingId: 's1',

  futureGoals: [
    {
      id: 'g1',
      year: 'Senior Year',
      title: 'Complete High School with Honors & AP CS',
      description: 'Finish advanced coursework in Computer Science, Calculus, and Digital Arts while leading the school Web Development Club.',
      category: 'Education',
      status: 'In Progress'
    },
    {
      id: 'g2',
      year: 'Year 1 College',
      title: 'Begin Computer Science & HCI Degree',
      description: 'Enroll in a forward-thinking university program fusing software engineering with user experience design and creative media.',
      category: 'Education',
      status: 'Upcoming'
    },
    {
      id: 'g3',
      year: 'Year 2-3 College',
      title: 'First Tech & Design Internship',
      description: 'Collaborate with a creative digital studio or technology organization building impactful, accessible web applications.',
      category: 'Career',
      status: 'Upcoming'
    },
    {
      id: 'g4',
      year: 'Year 4 College',
      title: 'Senior Capstone & Interactive Exhibit',
      description: 'Design and deploy an open-source web application showcasing real-time data visualization and generative digital aesthetics.',
      category: 'Skill',
      status: 'Upcoming'
    },
    {
      id: 'g5',
      year: 'Post-Graduation',
      title: 'Launch Full-Time Creative Tech Career',
      description: 'Work as a full-stack frontend engineer and creative technologist crafting innovative software used by millions worldwide.',
      category: 'Career',
      status: 'Milestone'
    }
  ],
  careerAspiration: 'Creative Technologist & Frontend Software Engineer',
  dreamCollege: 'Top University for Computer Science & Interactive Media Design',
  favoriteQuote: '“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt'
};

export const STORAGE_KEY = 'brielle_website_content_v1';
export const SUBMISSIONS_KEY = 'brielle_website_submissions_v1';
