import React, { useState } from 'react';
import { SiteContent, ContactSubmission, defaultSiteContent } from '../data/siteData';
import { 
  Settings2, 
  Inbox, 
  Trash2, 
  CheckCircle, 
  Mail, 
  RotateCcw, 
  Download, 
  Save, 
  User, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  Search,
  Plus,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  Camera,
  Music2,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface AdminPageProps {
  content: SiteContent;
  submissions: ContactSubmission[];
  onUpdateContent: (newContent: SiteContent) => void;
  onUpdateSubmissions: (submissions: ContactSubmission[]) => void;
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  content,
  submissions,
  onUpdateContent,
  onUpdateSubmissions,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'content' | 'layout'>('submissions');
  const [savedNotice, setSavedNotice] = useState(false);
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Form edit state for content
  const [editForm, setEditForm] = useState<SiteContent>({ ...content });

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContent(editForm);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all content to Brielle Davis' original defaults?")) {
      onUpdateContent(defaultSiteContent);
      setEditForm({ ...defaultSiteContent });
    }
  };

  const handleDeleteSubmission = (id: string) => {
    onUpdateSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleToggleRead = (id: string) => {
    onUpdateSubmissions(submissions.map(s => 
      s.id === id ? { ...s, read: !s.read } : s
    ));
  };

  const handleClearAllSubmissions = () => {
    if (window.confirm("Delete all contact submissions?")) {
      onUpdateSubmissions([]);
    }
  };

  const handleAddSampleSubmission = () => {
    const samples = [
      {
        name: 'Jordan Rivera',
        email: 'jordan.rivera@highschool.org',
        subject: 'Collaboration on Coding Club Project',
        message: 'Hi Brielle! I saw your new portfolio website with the soft blue and pastel pink design. I would love to collaborate on the next hackathon project!'
      },
      {
        name: 'University Admissions Counselor',
        email: 'admissions@tech-institute.edu',
        subject: 'STEM Portfolio Review Inquiry',
        message: 'Dear Brielle, your web development projects and creative media showcases demonstrate great initiative. We encourage you to submit this as supplementary portfolio material!'
      }
    ];

    const pick = samples[Math.floor(Math.random() * samples.length)];
    const newSub: ContactSubmission = {
      id: `sub_${Date.now()}`,
      name: pick.name,
      email: pick.email,
      subject: pick.subject,
      message: pick.message,
      createdAt: new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      read: false
    };

    onUpdateSubmissions([newSub, ...submissions]);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `brielle_submissions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Subject', 'Date', 'Read', 'Message'];
    const rows = submissions.map(s => [
      `"${s.id}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.subject || '').replace(/"/g, '""')}"`,
      `"${s.createdAt}"`,
      s.read ? 'Yes' : 'No',
      `"${s.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", encodeURI(csvContent));
    downloadAnchor.setAttribute("download", `brielle_submissions_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filtered submissions
  const filteredSubmissions = submissions
    .filter(s => {
      if (submissionFilter === 'unread') return !s.read;
      if (submissionFilter === 'read') return s.read;
      return true;
    })
    .filter(s => {
      if (!submissionSearch.trim()) return true;
      const q = submissionSearch.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.subject && s.subject.toLowerCase().includes(q)) ||
        s.message.toLowerCase().includes(q)
      );
    });

  const unreadCount = submissions.filter(s => !s.read).length;

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-white">
              Roadmap Step 5
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs font-medium text-slate-600">Administration & Data Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Manage contact form submissions, update website biography, and configure Phase 1 layout options.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl bg-soft-blue text-slate-900 text-xs font-semibold hover:bg-soft-blue/80 transition-colors"
          >
            Preview Live Site
          </button>
        </div>
      </section>

      {/* Roadmap Metrics Overview Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Form Submissions</span>
            <Inbox className="w-4 h-4 text-[#95a9e8]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif-display font-bold text-slate-900">{submissions.length}</span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#fcbbfa] text-[#842682]">
                {unreadCount} new
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">Stored in browser memory</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Media Items</span>
            <Camera className="w-4 h-4 text-[#fcbbfa]" />
          </div>
          <span className="text-2xl font-serif-display font-bold text-slate-900">{content.mediaList.length}</span>
          <span className="text-[11px] text-slate-400">Step 2 gallery entries</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Future Milestones</span>
            <Compass className="w-4 h-4 text-[#95a9e8]" />
          </div>
          <span className="text-2xl font-serif-display font-bold text-slate-900">{content.futureGoals.length}</span>
          <span className="text-[11px] text-slate-400">Step 3 academic roadmap</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Music Catalog</span>
            <Music2 className="w-4 h-4 text-[#fcbbfa]" />
          </div>
          <span className="text-2xl font-serif-display font-bold text-slate-900">{content.musicList.length}</span>
          <span className="text-[11px] text-slate-400">Step 4 heavy rotation</span>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'submissions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Form Submissions</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'submissions' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>
            {submissions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'content'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Home Page Bio & Content</span>
        </button>

        <button
          onClick={() => setActiveTab('layout')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'layout'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Layout Preferences</span>
        </button>
      </div>

      {/* Tab 1: Submissions */}
      {activeTab === 'submissions' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-serif-display font-bold text-slate-900">
                Contact Messages Received
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submissions are stored persistently in browser storage & JSON exportable.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleAddSampleSubmission}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-soft-blue-100 text-[#304485] hover:bg-soft-blue-200 text-xs font-medium"
                title="Add a sample message to test inbox"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Sample</span>
              </button>

              <button
                onClick={handleExportCSV}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                title="Export submissions as CSV spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleExportJSON}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                title="Export submissions as raw JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>

              <button
                onClick={handleClearAllSubmissions}
                disabled={submissions.length === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setSubmissionFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  submissionFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({submissions.length})
              </button>
              <button
                onClick={() => setSubmissionFilter('unread')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  submissionFilter === 'unread'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setSubmissionFilter('read')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  submissionFilter === 'read'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Read ({submissions.length - unreadCount})
              </button>
            </div>

            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={submissionSearch}
                onChange={(e) => setSubmissionSearch(e.target.value)}
                placeholder="Search messages by name/topic..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#95a9e8]"
              />
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-slate-800 text-sm">No matching messages</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No submissions meet the active search or filter criteria.
              </p>
              <button
                onClick={handleAddSampleSubmission}
                className="text-xs font-semibold text-[#4056a0] hover:underline"
              >
                + Generate Test Message
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    sub.read 
                      ? 'bg-slate-50/60 border-slate-200 opacity-80' 
                      : 'bg-white border-soft-blue shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-semibold text-slate-900">{sub.name}</strong>
                        <span className="text-xs text-slate-400">({sub.email})</span>
                        {!sub.read && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#95a9e8] text-slate-900">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#465caf] mt-0.5">
                        Subject: {sub.subject}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 text-[11px]">{sub.createdAt}</span>
                      <button
                        onClick={() => handleToggleRead(sub.id)}
                        className="px-2.5 py-1 rounded-lg border text-[11px] hover:bg-slate-100 text-slate-600"
                      >
                        {sub.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteSubmission(sub.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                    {sub.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <a
                      href={`mailto:${sub.email}?subject=Re: ${encodeURIComponent(sub.subject || 'Website Inquiry')}`}
                      className="text-[#3b519c] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Content Management */}
      {activeTab === 'content' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
          <form onSubmit={handleSaveContent} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-serif-display font-bold text-slate-900">
                  Edit Home Page Narrative & Identity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update Brielle's bio paragraphs, profile image, and contact links.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {savedNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>All changes saved successfully to your website!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Headline / Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Contact Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Profile Photo Image URL</label>
                  <input
                    type="url"
                    value={editForm.profilePhotoUrl}
                    onChange={(e) => setEditForm({ ...editForm, profilePhotoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Profile Photo Caption</label>
                  <input
                    type="text"
                    value={editForm.profilePhotoCaption}
                    onChange={(e) => setEditForm({ ...editForm, profilePhotoCaption: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bio Paragraph 1 (Introduction)</label>
                  <textarea
                    rows={2}
                    value={editForm.bioParagraph1}
                    onChange={(e) => setEditForm({ ...editForm, bioParagraph1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bio Paragraph 2 (Focus)</label>
                  <textarea
                    rows={2}
                    value={editForm.bioParagraph2}
                    onChange={(e) => setEditForm({ ...editForm, bioParagraph2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bio Paragraph 3 (Personal & Hobbies)</label>
                  <textarea
                    rows={2}
                    value={editForm.bioParagraph3}
                    onChange={(e) => setEditForm({ ...editForm, bioParagraph3: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="font-semibold text-slate-800 text-xs">Social Links</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={editForm.socials.github}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      socials: { ...editForm.socials, github: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Instagram</label>
                  <input
                    type="url"
                    value={editForm.socials.instagram}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      socials: { ...editForm.socials, instagram: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={editForm.socials.linkedin}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      socials: { ...editForm.socials, linkedin: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Twitter / X</label>
                  <input
                    type="url"
                    value={editForm.socials.twitter}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      socials: { ...editForm.socials, twitter: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 shadow-sm"
              >
                Save All Changes
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Tab 3: Layout Configuration */}
      {activeTab === 'layout' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-xl font-serif-display font-bold text-slate-900">
              Default Layout & Theme Decisions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              These settings control how the Home Page and contact sections render.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <strong className="block text-slate-800 font-semibold">1. Photo Placement</strong>
              <div className="space-y-1.5">
                {(['right', 'left', 'top'] as const).map(pos => (
                  <button
                    key={pos}
                    onClick={() => {
                      const updated = {
                        ...content,
                        layoutPreferences: { ...content.layoutPreferences, photoPosition: pos }
                      };
                      onUpdateContent(updated);
                    }}
                    className={`w-full py-2 px-3 text-left rounded-lg capitalize border font-medium ${
                      content.layoutPreferences.photoPosition === pos
                        ? 'bg-soft-blue text-slate-900 border-[#7791e2] font-semibold'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Photo on {pos}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <strong className="block text-slate-800 font-semibold">2. Text Alignment</strong>
              <div className="space-y-1.5">
                {(['left', 'center'] as const).map(align => (
                  <button
                    key={align}
                    onClick={() => {
                      const updated = {
                        ...content,
                        layoutPreferences: { ...content.layoutPreferences, textAlign: align }
                      };
                      onUpdateContent(updated);
                    }}
                    className={`w-full py-2 px-3 text-left rounded-lg capitalize border font-medium ${
                      content.layoutPreferences.textAlign === align
                        ? 'bg-soft-blue text-slate-900 border-[#7791e2] font-semibold'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {align}-Aligned Bio
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <strong className="block text-slate-800 font-semibold">3. Contact Style</strong>
              <div className="space-y-1.5">
                {[
                  { id: 'two-column', label: 'Two-Column Split' },
                  { id: 'boxed-card', label: 'Centered Card' },
                  { id: 'minimalist', label: 'Minimalist Clean' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => {
                      const updated = {
                        ...content,
                        layoutPreferences: { ...content.layoutPreferences, contactStyle: style.id as any }
                      };
                      onUpdateContent(updated);
                    }}
                    className={`w-full py-2 px-3 text-left rounded-lg border font-medium ${
                      content.layoutPreferences.contactStyle === style.id
                        ? 'bg-pastel-pink text-slate-900 border-[#e890e6] font-semibold'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
