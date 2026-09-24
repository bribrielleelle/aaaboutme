import React, { useState } from 'react';
import { 
  SiteContent, 
  ContactSubmission 
} from '../data/siteData';
import { 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Send, 
  Camera, 
  Settings2, 
  Sliders, 
  Music2, 
  HelpCircle,
  Compass,
  FileCheck
} from 'lucide-react';
import { 
  GithubIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  TwitterIcon 
} from './SocialIcons';

interface HomePageProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onAddSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'read'>) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  content,
  onUpdateContent,
  onAddSubmission,
  onNavigate
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  // Phase 1 Interactive Layout Testing Drawer / Panel
  const [showLayoutConfig, setShowLayoutConfig] = useState(false);
  const [showPhase1Checklist, setShowPhase1Checklist] = useState(true);

  // Profile image upload simulation or custom URL
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [tempPhotoUrl, setTempPhotoUrl] = useState(content.profilePhotoUrl);
  const [tempCaption, setTempCaption] = useState(content.profilePhotoCaption);

  const copyEmail = () => {
    navigator.clipboard.writeText(content.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    onAddSubmission({
      name: contactName,
      email: contactEmail,
      subject: contactSubject || 'Website Inquiry',
      message: contactMessage
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 4500);
  };

  const handleLayoutChange = (key: keyof SiteContent['layoutPreferences'], value: string) => {
    onUpdateContent({
      ...content,
      layoutPreferences: {
        ...content.layoutPreferences,
        [key]: value
      }
    });
  };

  const handleSavePhoto = () => {
    onUpdateContent({
      ...content,
      profilePhotoUrl: tempPhotoUrl,
      profilePhotoCaption: tempCaption
    });
    setIsEditingPhoto(false);
  };

  const { photoPosition, textAlign, contactStyle } = content.layoutPreferences;

  return (
    <div className="space-y-16">
      {/* Phase 1 Rubric Assistant Floating Banner */}
      <section className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-soft-blue-200 shadow-sm transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-soft-blue text-[#2e3e7a]">
                <FileCheck className="w-3.5 h-3.5" />
                Phase 1: Home Page Active
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs font-medium text-slate-600">Roadmap Step 1 of 5</span>
            </div>
            <p className="text-sm text-slate-700 font-medium">
              Review and test your Biography, Profile Photo, Contact Links, and Layout Preferences below!
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setShowLayoutConfig(!showLayoutConfig)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-soft-blue-100 text-[#304485] hover:bg-soft-blue/30 border border-soft-blue/40 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showLayoutConfig ? 'Hide Layout Controls' : 'Test Layout Decisions'}</span>
            </button>
            <button
              onClick={() => setShowPhase1Checklist(!showPhase1Checklist)}
              className="inline-flex items-center justify-center p-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              title="Toggle checklist"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase 1 Checklist Detail */}
        {showPhase1Checklist && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/50 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 block font-semibold">1. Biography Content</strong>
                <span className="text-emerald-700">Final high school student narrative included & editable.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/50 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 block font-semibold">2. Profile Photo & Caption</strong>
                <span className="text-emerald-700">High-res portrait with custom caption and photo changer.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/50 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 block font-semibold">3. Email & Contact Form</strong>
                <span className="text-emerald-700">Verified email (brielledavis919@gmail.com) with storage.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/50 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 block font-semibold">4. Layout Decisions</strong>
                <span className="text-emerald-700">Photo left/right & contact styling ready to test live.</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Layout Decision Switcher */}
        {showLayoutConfig && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Settings2 className="w-4 h-4 text-[#4b62b0]" />
                Live Layout & Styling Decisions (Phase 1)
              </span>
              <span className="text-[11px] text-slate-500">Changes apply immediately to this page</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Photo Position Decision */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Profile Photo Position:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['right', 'left', 'top'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => handleLayoutChange('photoPosition', pos)}
                      className={`py-1.5 text-xs font-medium rounded-lg capitalize border transition-all ${
                        photoPosition === pos
                          ? 'bg-[#95a9e8] text-slate-900 border-[#728ce0] font-semibold shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Alignment Decision */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Bio Text Alignment:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['left', 'center'] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => handleLayoutChange('textAlign', align)}
                      className={`py-1.5 text-xs font-medium rounded-lg capitalize border transition-all ${
                        textAlign === align
                          ? 'bg-[#95a9e8] text-slate-900 border-[#728ce0] font-semibold shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Section Styling Decision */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Contact Section Layout:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'two-column', label: '2-Col' },
                    { id: 'boxed-card', label: 'Boxed' },
                    { id: 'minimalist', label: 'Clean' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleLayoutChange('contactStyle', style.id)}
                      className={`py-1.5 text-xs font-medium rounded-lg capitalize border transition-all ${
                        contactStyle === style.id
                          ? 'bg-[#fcbbfa] text-slate-900 border-[#eb92e8] font-semibold shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Hero & Biography Section */}
      <section 
        className={`transition-all ${
          photoPosition === 'top' 
            ? 'flex flex-col items-center' 
            : photoPosition === 'left'
            ? 'flex flex-col md:flex-row-reverse items-center justify-between gap-12'
            : 'flex flex-col md:flex-row items-center justify-between gap-12'
        }`}
      >
        {/* Biography Content Column */}
        <div className={`space-y-6 max-w-2xl ${textAlign === 'center' ? 'text-center items-center' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-blue-100 border border-soft-blue-200 text-xs font-semibold text-[#2f407b]">
            <span className="w-2 h-2 rounded-full bg-[#95a9e8] animate-pulse"></span>
            <span>Welcome to my official portfolio</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold tracking-tight text-slate-900 leading-[1.15]">
              Hello, I'm <span className="text-[#3b4e96] underline decoration-[#fcbbfa] decoration-4 decoration-wavy">{content.name}</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-700">
              {content.title}
            </p>
            <p className="text-sm text-slate-500 font-normal">
              {content.subtitle}
            </p>
          </div>

          {/* Formatted Narrative Bio */}
          <div className="space-y-4 text-slate-700 leading-relaxed text-base border-l-2 border-[#fcbbfa] pl-4">
            <p>{content.bioParagraph1}</p>
            <p>{content.bioParagraph2}</p>
            <p className="text-slate-600 text-sm italic">{content.bioParagraph3}</p>
          </div>

          {/* Location & Quick Badges */}
          <div className={`flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-[#95a9e8]" />
              {content.location}
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-[#fcbbfa]" />
              High School Class of 2027
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Music2 className="w-4 h-4 text-[#95a9e8]" />
              Music & Creative Media
            </span>
          </div>

          {/* Call to Actions & Copy Email */}
          <div className={`flex flex-wrap items-center gap-3 pt-2 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors shadow-xs"
              title="Copy verified email"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#95a9e8]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('media')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-blue-50 border border-soft-blue-200 text-[#324584] text-sm font-medium hover:bg-soft-blue-100 transition-colors"
            >
              <span>View Media Page</span>
            </button>
          </div>

          {/* Social Links Bar */}
          <div className={`pt-2 flex items-center gap-3 text-slate-500 ${textAlign === 'center' ? 'justify-center' : 'justify-start'}`}>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Connect:</span>
            <a
              href={content.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-200 hover:text-slate-900 hover:border-slate-300 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={content.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-200 hover:text-pink-600 hover:border-pink-300 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={content.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-200 hover:text-blue-600 hover:border-blue-300 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={content.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white border border-slate-200 hover:text-slate-900 hover:border-slate-300 transition-colors"
              title="Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Profile Photo & Media Card Column */}
        <div className={`w-full max-w-sm shrink-0 ${photoPosition === 'top' ? 'mb-8' : ''}`}>
          <div className="relative group bg-white p-3.5 rounded-3xl border border-soft-blue-200 shadow-md transition-all hover:shadow-lg">
            {/* Pastel decorative glow backdrop */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#95a9e8]/30 to-[#fcbbfa]/30 -z-10 blur-md opacity-75"></div>

            <div className="relative overflow-hidden rounded-2xl aspect-4/5 bg-slate-100">
              <img
                src={content.profilePhotoUrl}
                alt={content.name}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  // Fallback placeholder image if URL fails
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {/* Photo Edit Trigger Button */}
              <button
                onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-sm shadow-md transition-all text-xs flex items-center gap-1.5"
                title="Change or upload photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-medium">Update Photo</span>
              </button>
            </div>

            {/* Photo Caption */}
            <div className="mt-3 text-center px-1">
              <p className="text-xs font-semibold text-slate-800">
                {content.name}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 italic">
                "{content.profilePhotoCaption}"
              </p>
            </div>

            {/* Photo Edit Modal / Popout */}
            {isEditingPhoto && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <span className="font-semibold text-slate-800 block">Edit Profile Photo & Caption</span>
                <div>
                  <label className="block text-slate-600 mb-1">Image URL:</label>
                  <input
                    type="url"
                    value={tempPhotoUrl}
                    onChange={(e) => setTempPhotoUrl(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#95a9e8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Photo Caption:</label>
                  <input
                    type="text"
                    value={tempCaption}
                    onChange={(e) => setTempCaption(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#95a9e8]"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsEditingPhoto(false)}
                    className="px-2.5 py-1 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePhoto}
                    className="px-3 py-1 rounded-lg bg-[#95a9e8] text-slate-900 font-semibold hover:bg-[#839ce2]"
                  >
                    Save Photo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Roadmap Navigation Preview */}
      <section className="bg-gradient-to-r from-soft-blue-50 to-pastel-pink-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-serif-display font-bold text-slate-900">
              Explore All 5 Website Pages
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Structured to follow your 5-step curriculum: Home, Media, My Future, Music, and Admin.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
            Phase 1 / 5 Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('media')}
            className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-soft-blue text-left transition-all hover:shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-soft-blue-100 text-[#304485] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
            <strong className="text-sm font-semibold text-slate-800 block group-hover:text-[#304485]">
              2. Media Page
            </strong>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Photo galleries, project visuals, school highlights, and captions.
            </p>
          </button>

          <button
            onClick={() => onNavigate('future')}
            className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-pastel-pink text-left transition-all hover:shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-pastel-pink-100 text-[#882b86] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <strong className="text-sm font-semibold text-slate-800 block group-hover:text-[#882b86]">
              3. My Future Page
            </strong>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              College roadmap, career aspirations, and high school milestone timeline.
            </p>
          </button>

          <button
            onClick={() => onNavigate('music')}
            className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-soft-blue text-left transition-all hover:shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-soft-blue-100 text-[#304485] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Music2 className="w-4 h-4" />
            </div>
            <strong className="text-sm font-semibold text-slate-800 block group-hover:text-[#304485]">
              4. Music Page
            </strong>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Heavy rotation playlists, interactive music player, and favorite artists.
            </p>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="p-4 rounded-xl bg-white border border-slate-200/80 hover:border-slate-400 text-left transition-all hover:shadow-sm group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Settings2 className="w-4 h-4" />
            </div>
            <strong className="text-sm font-semibold text-slate-800 block group-hover:text-slate-900">
              5. Admin Dashboard
            </strong>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Review received contact messages and update site content anytime.
            </p>
          </button>
        </div>
      </section>

      {/* Contact Section with Dynamic Layout Styling */}
      <section id="contact" className="scroll-mt-24 pt-4">
        <div className="mb-8 text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#354888]">
            Phase 1 Contact Requirement
          </span>
          <h2 className="text-3xl font-serif-display font-bold text-slate-900">
            Let's Start a Conversation
          </h2>
          <p className="text-sm text-slate-600">
            Have questions about my projects, collaborations, or want to say hello? Send me a note directly.
          </p>
        </div>

        {/* Dynamic Contact Section based on contactStyle */}
        {contactStyle === 'two-column' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-8 border border-soft-blue-200 shadow-sm">
            {/* Left Column: Direct Info */}
            <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-serif-display font-semibold text-slate-900">
                  Contact Information
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I monitor my inbox regularly for academic inquiries, web development feedback, and creative projects.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <Mail className="w-4 h-4 text-[#95a9e8] shrink-0" />
                    <div className="overflow-hidden">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Direct Email</span>
                      <a href={`mailto:${content.email}`} className="text-xs font-medium text-slate-800 hover:text-[#324584] truncate block">
                        {content.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <MapPin className="w-4 h-4 text-[#fcbbfa] shrink-0" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Location</span>
                      <span className="text-xs font-medium text-slate-800">{content.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-soft-blue-50 border border-soft-blue-200 text-xs text-[#2c3d79]">
                <strong className="block font-semibold mb-1">Persistent Storage Enabled</strong>
                Every message submitted through this form is stored in your Admin Dashboard for review.
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="md:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#95a9e8] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#95a9e8] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Project inquiry / Greetings"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#95a9e8] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#95a9e8] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    No spam ever · Replies sent to your email
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>

                {formSubmitted && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thank you! Your message has been sent and stored in Brielle's admin dashboard.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        ) : contactStyle === 'boxed-card' ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border-2 border-soft-blue shadow-md">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#354888]">Direct Note</span>
                <h3 className="text-xl font-serif-display font-bold text-slate-900">Send Brielle a Message</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-pastel-pink-100 text-[#8b2d89] flex items-center justify-center font-bold">
                BD
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="How can Brielle help you?"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
              >
                Send Direct Message
              </button>

              {formSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs text-center font-medium">
                  Message delivered to Brielle's admin dashboard!
                </div>
              )}
            </form>
          </div>
        ) : (
          /* Minimalist Style */
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="text-center sm:text-left">
                <span className="text-xs text-slate-500">Brielle Davis Email</span>
                <p className="font-semibold text-slate-900">{content.email}</p>
              </div>
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-lg bg-soft-blue text-slate-900 font-semibold text-xs hover:bg-soft-blue/80"
              >
                {copiedEmail ? 'Copied!' : 'Copy Direct Address'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Name"
                  className="px-3 py-2 border rounded-lg text-xs"
                />
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Email"
                  className="px-3 py-2 border rounded-lg text-xs"
                />
              </div>
              <textarea
                required
                rows={3}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Brief message..."
                className="w-full px-3 py-2 border rounded-lg text-xs"
              ></textarea>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};
