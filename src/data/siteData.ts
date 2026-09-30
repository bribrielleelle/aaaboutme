import { applePlaylistTracks } from './playlistData';

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
  category: 'School Projects' | 'Digital Art' | 'Photography' | 'Achievements' | 'Friends & Hangouts';
  caption: string;
  imageUrl: string;
  albumImages?: string[];
  isAlbum?: boolean;
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
  spotifyTrackId?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
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
  profilePhotos?: string[];
  
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
  careerDescription?: string;
  dreamCollege: string;
  dreamCollegeDescription?: string;
  dreamsHeader?: string;
  dreamsDescription?: string;
  favoriteQuote: string;
}

export const defaultSiteContent: SiteContent = {
  name: 'Brielle Davis',
  title: 'High School Student & Aspiring Web Developer',
  subtitle: 'Exploring code, creative media, and future horizons one project at a time.',
  bioParagraph1: "Hi, I'm Brielle Davis! I am a passionate high school student taking my first deep dive into web development and digital design. I love taking ideas from imagination to reality using code, and exploring how modern technology can empower personal storytelling.",
  bioParagraph2: "Beyond programming, my world revolves around music, creative media, and planning for an exciting future in technology and design. This website serves as my digital home and living portfolio for everything I am creating and learning.",
  bioParagraph3: "When I am not coding or studying, you can find me discovering new tracks, curating playlists, experimenting with visual arts, and preparing for college life.",
  profilePhotoUrl: 'https://i.imgur.com/h1gicLO.jpeg',
  profilePhotoCaption: 'Brielle Davis — High School Portfolio & Creative Space',
  profilePhotos: [
    'https://i.imgur.com/h1gicLO.jpeg',
    'https://i.imgur.com/1okze8g.jpeg'
  ],

  email: 'brielledavis919@gmail.com',
  location: 'United States',
  socials: {
    instagram: 'https://www.instagram.com/bribrielleelle/',
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
      caption: 'Initial responsive layout wireframes and aesthetic color studies utilizing pastel palettes (#95a9e8 and #fcbbfa). Live prototype: briellesweets.replit.app',
      imageUrl: 'https://i.imgur.com/E4VnBsR.jpeg',
      date: 'Fall 2026'
    },
    {
      id: 'm2',
      title: 'Friends And Hangouts',
      category: 'Friends & Hangouts',
      caption: 'Memorable times with friends — weekend hangouts, spontaneous laughter, and making the best memories together.',
      imageUrl: 'https://i.imgur.com/WiDkAxX.jpeg',
      isAlbum: true,
      albumImages: [
        'https://i.imgur.com/WiDkAxX.jpeg',
        'https://i.imgur.com/hSJPWEZ.jpeg',
        'https://i.imgur.com/LmsmwZj.jpeg',
        'https://i.imgur.com/Ncw6bWU.jpeg',
        'https://i.imgur.com/66W4NTB.jpeg',
        'https://i.imgur.com/GLm7kd6.jpeg'
      ],
      date: '2026'
    },
    {
      id: 'm3',
      title: 'Sunset Beach Photography',
      category: 'Photography',
      caption: 'Golden hour captures focusing on natural light gradients, coastline reflections, and atmospheric balance.',
      imageUrl: 'https://i.imgur.com/Dc3OD0q.jpeg',
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

  musicList: applePlaylistTracks,
  currentlyPlayingId: 's_1',

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
  careerAspiration: 'Interior Designer & Real Estate Agent',
  careerDescription: 'Also in my free time, I enjoy building exteriors and interiors in games and apps that allow me to put my decorating skills to the test and show other players. I want to get into Real Estate and show people what I can sell and help find their forever home. I admire the beauty of architecture, and this job allows me to appreciate it.',
  dreamCollege: 'Community College into a University',
  dreamCollegeDescription: 'I have many ambitions for myself, and completing 2 years of college for free is one of them! Majoring in Interior Design and going to school for Business Administration, Marketing, and Finance for 4 or more years of schooling is my goal to becoming who I want to be.',
  dreamsHeader: 'Dreams',
  dreamsDescription: 'I have other dreams that I want to accomplish, such as becoming a music artist or a producer. I play Bass, Guitar, Keyboard, And Drums and I could be a one woman band myself not gonna lie. Theres many bands and artists that give me inspiration like Brent Faiyaz, Pierce The Veil, and Steve Lacy.',
  favoriteQuote: '“The future belongs to those who believe in the beauty of their dreams.” — Eleanor Roosevelt'
};

export const STORAGE_KEY = 'brielle_website_content_v1';
export const SUBMISSIONS_KEY = 'brielle_website_submissions_v1';
