import React, { useState, useEffect } from 'react';
import { SiteContent, MediaItem } from '../data/siteData';
import { 
  Camera, 
  Image as ImageIcon, 
  Plus, 
  X, 
  Calendar, 
  Tag, 
  Maximize2, 
  Sparkles,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCircle2,
  Search
} from 'lucide-react';

interface MediaPageProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onNavigate: (page: string) => void;
}

export const MediaPage: React.FC<MediaPageProps> = ({
  content,
  onUpdateContent,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // New Media Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('School Projects');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDate, setNewDate] = useState('2026');

  const categories = ['All', 'School Projects', 'Digital Art', 'Photography', 'Achievements'];

  // Category counts
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return content.mediaList.length;
    return content.mediaList.filter(item => item.category === cat).length;
  };

  const filteredMedia = content.mediaList
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.caption.toLowerCase().includes(q);
    });

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, filteredMedia]);

  const handleNextLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredMedia.findIndex(i => i.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    setLightboxItem(filteredMedia[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredMedia.findIndex(i => i.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setLightboxItem(filteredMedia[prevIndex]);
  };

  const handleCopyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim() || !newImageUrl.trim()) return;

    const newItem: MediaItem = {
      id: `m_${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      caption: newCaption.trim(),
      imageUrl: newImageUrl.trim(),
      date: newDate.trim() || '2026'
    };

    onUpdateContent({
      ...content,
      mediaList: [newItem, ...content.mediaList]
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
  };

  const handlePresetSelect = (preset: { title: string; category: MediaItem['category']; caption: string; imageUrl: string }) => {
    setNewTitle(preset.title);
    setNewCategory(preset.category);
    setNewCaption(preset.caption);
    setNewImageUrl(preset.imageUrl);
  };

  const handleDeleteMedia = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateContent({
      ...content,
      mediaList: content.mediaList.filter(item => item.id !== id)
    });
    if (lightboxItem?.id === id) {
      setLightboxItem(null);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-8 border border-soft-blue-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#95a9e8]/20 to-[#fcbbfa]/20 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-soft-blue text-[#2b3a75]">
                Roadmap Step 2
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs font-medium text-slate-600">Visual Curation & Media</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-slate-900">
              Media & Creative Gallery
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              A curated collection of school projects, digital artwork, photography, and presentation highlights documented by Brielle Davis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Media Item</span>
            </button>
          </div>
        </div>

        {/* Category Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#95a9e8] text-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat ? 'bg-white/80 text-slate-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>

          <div className="relative sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#95a9e8]"
            />
          </div>
        </div>
      </section>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-semibold text-slate-700">No media items found</h3>
          <p className="text-xs text-slate-500">Try changing your category filter or search query.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-xs text-[#354988] font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-[#95a9e8] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Preview with Hover Overlay */}
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-sm">
                      <Maximize2 className="w-3.5 h-3.5 text-[#465caf]" />
                      <span>View Detail</span>
                    </span>
                  </div>

                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-slate-700 shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Card Meta & Caption */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-base group-hover:text-[#324584] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-slate-100 text-xs">
                <span className="text-[11px] font-medium text-[#465caf] group-hover:underline">
                  Expand caption →
                </span>
                <button
                  onClick={(e) => handleDeleteMedia(item.id, e)}
                  className="text-slate-400 hover:text-rose-500 text-[11px] transition-colors p-1"
                  title="Remove item"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Lightbox Modal with Next / Prev */}
      {lightboxItem && (
        <div 
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-scale-up relative"
          >
            <div className="relative aspect-16/10 bg-slate-950 flex items-center justify-center">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next navigation inside lightbox */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-soft-blue-100 text-[#29386c]">
                  {lightboxItem.category}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyImageUrl(lightboxItem.imageUrl)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied URL!' : 'Copy Link'}</span>
                  </button>
                  <span className="text-xs text-slate-500 font-medium">
                    {lightboxItem.date}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif-display font-bold text-slate-900">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {lightboxItem.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 italic">
                  Press Left / Right arrows or Escape to navigate
                </span>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Media Item Drawer / Modal with Quick Presets */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-serif-display font-bold text-slate-900">Add New Media Entry</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick preset suggestions */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Quick Preset Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => handlePresetSelect({
                    title: 'Interactive Animation Experiment',
                    category: 'Digital Art',
                    caption: 'Motion design frames investigating easing functions and user interface micro-interactions.',
                    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
                  })}
                  className="px-2 py-1 rounded-md bg-soft-blue-50 text-[#304485] hover:bg-soft-blue-100"
                >
                  + Motion Design
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect({
                    title: 'Student Leadership Conference',
                    category: 'Achievements',
                    caption: 'Elected student representative speaking on the intersection of STEM education and youthful creativity.',
                    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
                  })}
                  className="px-2 py-1 rounded-md bg-pastel-pink-50 text-[#852783] hover:bg-pastel-pink-100"
                >
                  + Leadership
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect({
                    title: 'Campus Architecture Study',
                    category: 'Photography',
                    caption: 'Exploring symmetry, natural lighting, and shadows across university and school buildings.',
                    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
                  })}
                  className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  + Photography
                </button>
              </div>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Science Fair Presentation"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#95a9e8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#95a9e8] focus:outline-none"
                >
                  <option value="School Projects">School Projects</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Photography">Photography</option>
                  <option value="Achievements">Achievements</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#95a9e8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Caption / Description *</label>
                <textarea
                  required
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Explain what this media represents..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#95a9e8] focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Year / Date</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Fall 2026"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#95a9e8] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#95a9e8] text-slate-900 font-semibold hover:bg-[#8299df]"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Navigation to Next Roadmap Item */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Next Up in Roadmap:</span>
          <h4 className="font-serif-display font-bold text-slate-900 text-lg">Roadmap Step 3: My Future Page</h4>
          <p className="text-xs text-slate-600">Discover college goals, career ambitions, and milestone timeline.</p>
        </div>
        <button
          onClick={() => onNavigate('future')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Go to My Future</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
