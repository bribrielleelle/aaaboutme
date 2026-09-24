import React, { useState, useEffect } from 'react';
import { 
  SiteContent, 
  ContactSubmission, 
  defaultSiteContent, 
  STORAGE_KEY, 
  SUBMISSIONS_KEY 
} from './data/siteData';
import { HomePage } from './components/HomePage';
import { MediaPage } from './components/MediaPage';
import { FuturePage } from './components/FuturePage';
import { MusicPage } from './components/MusicPage';
import { AdminPage } from './components/AdminPage';
import { 
  Home, 
  Camera, 
  Compass, 
  Music2, 
  Settings2, 
  Menu, 
  X, 
  Sparkles, 
  Mail, 
  Layers
} from 'lucide-react';

interface NavItem {
  id: 'home' | 'media' | 'future' | 'music' | 'admin';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | null;
}

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'media' | 'future' | 'music' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load content from localStorage or fallback
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to read localStorage content', e);
    }
    return defaultSiteContent;
  });

  // Load submissions from localStorage or fallback
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to read localStorage submissions', e);
    }
    return [
      {
        id: 'sub_demo_1',
        name: 'Ms. Henderson',
        email: 'henderson@school.edu',
        subject: 'Outstanding Web Development Project',
        message: 'Brielle, wonderful progress on your personal website! The color palette harmonizes beautifully and the five-page roadmap is structured clearly.',
        createdAt: '2026-09-24 09:30 AM',
        read: false
      }
    ];
  });

  // Save content when updated
  const handleUpdateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to persist content', e);
    }
  };

  // Add new submission
  const handleAddSubmission = (item: Omit<ContactSubmission, 'id' | 'createdAt' | 'read'>) => {
    const newSub: ContactSubmission = {
      ...item,
      id: `sub_${Date.now()}`,
      createdAt: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };

    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist submissions', e);
    }
  };

  // Update submissions list
  const handleUpdateSubmissions = (newSubmissions: ContactSubmission[]) => {
    setSubmissions(newSubmissions);
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(newSubmissions));
    } catch (e) {
      console.error('Failed to persist submissions', e);
    }
  };

  const unreadCount = submissions.filter(s => !s.read).length;

  const navItems: NavItem[] = [
    { id: 'home', label: '1. Home', icon: Home },
    { id: 'media', label: '2. Media', icon: Camera },
    { id: 'future', label: '3. My Future', icon: Compass },
    { id: 'music', label: '4. Music', icon: Music2 },
    { id: 'admin', label: '5. Admin', icon: Settings2, badge: unreadCount > 0 ? unreadCount : null }
  ];

  const navigateTo = (page: string) => {
    setActivePage(page as any);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fe] text-slate-800 antialiased selection:bg-[#fcbbfa] selection:text-slate-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-soft-blue-200/60 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo / Student Title */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#95a9e8] to-[#fcbbfa] flex items-center justify-center font-serif-display font-bold text-slate-900 text-lg shadow-xs group-hover:scale-105 transition-transform">
              BD
            </div>
            <div>
              <span className="font-serif-display font-bold text-slate-900 tracking-tight text-base sm:text-lg block group-hover:text-[#324584] transition-colors">
                {content.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 block tracking-wide">
                First Website & Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#374a87]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-[#fcbbfa] text-[#862984] text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activePage !== 'home') {
                  navigateTo('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Brielle</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-fade-in">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-soft-blue text-slate-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label} Page</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-pastel-pink text-[#852783]">
                      {item.badge} new
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {activePage === 'home' && (
          <HomePage
            content={content}
            onUpdateContent={handleUpdateContent}
            onAddSubmission={handleAddSubmission}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'media' && (
          <MediaPage
            content={content}
            onUpdateContent={handleUpdateContent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'future' && (
          <FuturePage
            content={content}
            onUpdateContent={handleUpdateContent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'music' && (
          <MusicPage
            content={content}
            onUpdateContent={handleUpdateContent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            content={content}
            submissions={submissions}
            onUpdateContent={handleUpdateContent}
            onUpdateSubmissions={handleUpdateSubmissions}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#95a9e8]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#fcbbfa]"></span>
              <span className="font-serif-display font-bold text-slate-900 text-sm">
                Brielle Davis' First Website
              </span>
            </div>
            <p className="text-xs text-slate-500">
              High School Web Development Project · Primary: <span className="font-mono text-[#4359a3]">#95a9e8</span> · Secondary: <span className="font-mono text-[#a53fa3]">#fcbbfa</span>
            </p>
          </div>

          {/* Quick Roadmap Tracker in Footer */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium text-slate-600">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => navigateTo(item.id)}
                  className={`hover:text-slate-900 transition-colors ${activePage === item.id ? 'font-bold text-[#344888]' : ''}`}
                >
                  {item.label}
                </button>
                {idx < navItems.length - 1 && <span className="text-slate-300">/</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            <span>© 2026 Brielle Davis. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
