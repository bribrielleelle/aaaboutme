import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Calendar,
  ExternalLink,
  Code2,
  Palette,
  Sparkles,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Copy,
  Heart,
  Send,
  User,
  Coffee,
  Globe,
  Terminal,
  Layers,
  BookOpen
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

interface Project {
  id: string;
  title: string;
  category: 'web' | 'design' | 'creative';
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  highlight: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'design' | 'creative'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'brielledavis919@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const projects: Project[] = [
    {
      id: '1',
      title: 'Modern Portfolio & Studio',
      category: 'web',
      description: 'An interactive personal showcase featuring sleek typography, responsive layouts, and responsive accessibility.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      highlight: 'High Performance & Accessible',
      link: '#',
      github: 'https://github.com/bribrielleelle/aaaboutme'
    },
    {
      id: '2',
      title: 'Design System & Component Kit',
      category: 'design',
      description: 'Comprehensive UI tokens, accessible color palettes, and modular component specifications for rapid prototyping.',
      tech: ['Figma', 'UI/UX', 'Design Tokens', 'Tailwind'],
      highlight: 'Design Consistency',
      link: '#'
    },
    {
      id: '3',
      title: 'Interactive Web Experiments',
      category: 'creative',
      description: 'A playground exploring micro-interactions, responsive typography, and state-driven animations.',
      tech: ['TypeScript', 'CSS Animation', 'Canvas'],
      highlight: 'Creative Development',
      link: '#'
    },
    {
      id: '4',
      title: 'Content & Knowledge Hub',
      category: 'web',
      description: 'Clean, distraction-free markdown reader and resource curation library for developers and creators.',
      tech: ['React', 'TypeScript', 'Responsive Design'],
      highlight: 'Intuitive Navigation',
      link: '#'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const skills = [
    {
      category: 'Frontend & UI',
      icon: <Code2 className="w-5 h-5 text-amber-600" />,
      items: ['React', 'TypeScript', 'JavaScript (ESNext)', 'HTML5 / Modern CSS', 'Tailwind CSS', 'Next.js / Vite']
    },
    {
      category: 'Design & Experience',
      icon: <Palette className="w-5 h-5 text-amber-600" />,
      items: ['UI/UX Wireframing', 'Responsive Design', 'Design Systems', 'Accessibility (a11y)', 'Prototyping', 'Typography']
    },
    {
      category: 'Tooling & Workflow',
      icon: <Terminal className="w-5 h-5 text-amber-600" />,
      items: ['Git & GitHub', 'Modern Web APIs', 'Node.js & npm', 'RESTful Architectures', 'Component Architecture', 'Performance Optimization']
    }
  ];

  const experiences = [
    {
      period: '2023 — Present',
      role: 'Frontend & Creative Developer',
      place: 'Independent & Projects',
      description: 'Building modern, accessible, and high-performance web applications and crafting clean user interfaces.'
    },
    {
      period: '2021 — 2023',
      role: 'Web & UI Designer',
      place: 'Design Collaborations',
      description: 'Designed user experiences, structured component hierarchies, and built responsive web layouts.'
    },
    {
      period: 'Background',
      role: 'Continuous Learner & Maker',
      place: 'Self-Directed & Community',
      description: 'Passionate about typography, web standards, clean code architecture, and human-centered design.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/85 border-b border-stone-200/70 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 font-serif-display font-semibold flex items-center justify-center text-sm group-hover:bg-amber-700 transition-colors">
              B
            </span>
            <span className="font-semibold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              Brielle Davis
            </span>
          </a>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-amber-700 transition-colors">About</a>
            <a href="#skills" className="hover:text-amber-700 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-amber-700 transition-colors">Work</a>
            <a href="#experience" className="hover:text-amber-700 transition-colors">Journey</a>
            <a href="#contact" className="hover:text-amber-700 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-stone-900 text-white hover:bg-amber-700 transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 md:py-16 w-full">
        {/* Hero Section */}
        <section id="about" className="py-6 md:py-10 border-b border-stone-200">
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/70 text-amber-900 text-xs font-medium border border-amber-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open to new opportunities & projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Hi, I'm <span className="text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2">Brielle Davis</span>.
              </h1>

              <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                Developer and designer crafting intuitive, thoughtful web experiences. I bridge clean, structured code with warm, purposeful design.
              </p>

              {/* Bio & Details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-stone-500 pt-2">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-stone-400" />
                  United States
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-stone-400" />
                  Frontend & UI Development
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-stone-400" />
                  Focus on Simplicity & Detail
                </span>
              </div>

              {/* Actions & Links */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all shadow-sm"
                >
                  Contact Me
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied email!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-500" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href="https://github.com/bribrielleelle"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-white border border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Profile Avatar Card */}
            <div className="w-full md:w-auto flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl bg-white p-4 border border-stone-200 shadow-sm flex flex-col items-center justify-between text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-stone-200 flex items-center justify-center shadow-inner border border-amber-200/50 mt-2">
                    <User className="w-12 h-12 text-amber-700" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-900">Brielle Davis</h3>
                    <p className="text-xs text-stone-500">Web Creator & Developer</p>
                  </div>

                  <div className="w-full pt-3 border-t border-stone-100 flex justify-between text-xs text-stone-500">
                    <div>
                      <span className="block font-bold text-stone-800">4+</span>
                      <span>Projects</span>
                    </div>
                    <div>
                      <span className="block font-bold text-stone-800">100%</span>
                      <span>Dedicated</span>
                    </div>
                    <div>
                      <span className="block font-bold text-stone-800">Clean</span>
                      <span>Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative / About Story */}
        <section className="py-12 border-b border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">Philosophy & Mindset</h2>
              <p className="text-sm text-stone-500">How I approach building for the digital world.</p>
            </div>
            <div className="md:col-span-2 space-y-4 text-stone-600 leading-relaxed">
              <p>
                I believe the most effective applications are those that combine intentional visual design with rock-solid, performant implementation. Every layout choice should serve a purpose, and every line of code should make the product faster, clearer, and more accessible.
              </p>
              <p>
                Whether building responsive landing pages, crafting reusable UI component libraries, or experimenting with novel interaction paradigms, I prioritize user empathy, thoughtful typography, and maintainable systems.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 border-b border-stone-200">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Skills & Tooling</h2>
            <p className="text-sm text-stone-500">The languages, frameworks, and disciplines I work with daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skillGroup, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100/80 group-hover:bg-amber-100/80 transition-colors">
                    {skillGroup.icon}
                  </div>
                  <h3 className="font-semibold text-stone-900">{skillGroup.category}</h3>
                </div>
                <ul className="space-y-2 text-sm text-stone-600">
                  {skillGroup.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Work / Projects */}
        <section id="projects" className="py-12 border-b border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">Featured Work</h2>
              <p className="text-sm text-stone-500">A curation of projects, prototypes, and experiments.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-lg text-xs font-medium">
              {(['all', 'web', 'design', 'creative'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200/50 px-2.5 py-0.5 rounded-full">
                      {project.highlight}
                    </span>
                    <span className="text-xs uppercase font-semibold text-stone-400 tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-stone-600 mt-2 mb-5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-stone-400">Design Concept</span>
                    )}

                    <button
                      onClick={() => alert(`Details for "${project.title}" are documented in this portfolio repository.`)}
                      className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-900 font-semibold transition-colors"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Milestones */}
        <section id="experience" className="py-12 border-b border-stone-200">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">Experience & Journey</h2>
            <p className="text-sm text-stone-500">Key milestones and focal points in my development path.</p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-stone-200">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 group">
                <div className="absolute left-1.5 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-amber-600 group-hover:scale-125 transition-transform"></div>
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-bold text-stone-900">{exp.role}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-amber-700 mb-2">{exp.place}</p>
                  <p className="text-sm text-stone-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>Let's talk</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                Interested in working together or saying hello?
              </h2>

              <p className="text-stone-600 leading-relaxed text-sm">
                Whether you have an inquiry, project proposal, or simply want to chat about design and development, my inbox is always open.
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-stone-100 text-stone-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Direct Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-stone-100 text-stone-700">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">GitHub</p>
                    <a
                      href="https://github.com/bribrielleelle"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors"
                    >
                      github.com/bribrielleelle
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-bold text-stone-900 mb-1">Send a Message</h3>
              <p className="text-xs text-stone-500 mb-5">Fill in your details below and I'll get back to you promptly.</p>

              {contactSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-semibold text-emerald-900 text-sm">Thank you for your message!</p>
                  <p className="text-xs text-emerald-700">I will reply to {formData.email} soon.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Hi Brielle, I'd love to connect regarding..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-amber-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/60 py-8 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Brielle Davis. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/bribrielleelle" target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href={`mailto:${email}`} className="hover:text-stone-900 transition-colors">
              Email
            </a>
            <span>•</span>
            <a href="#" className="hover:text-stone-900 transition-colors">
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
