import React, { useState } from 'react';
import { SiteContent, FutureGoal } from '../data/siteData';
import { 
  Compass, 
  GraduationCap, 
  Briefcase, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Plus, 
  Quote, 
  Award,
  BookOpen
} from 'lucide-react';

interface FuturePageProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onNavigate: (page: string) => void;
}

export const FuturePage: React.FC<FuturePageProps> = ({
  content,
  onUpdateContent,
  onNavigate
}) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalFilter, setGoalFilter] = useState<'All' | 'In Progress' | 'Upcoming' | 'Milestone'>('All');
  const [goalYear, setGoalYear] = useState('');
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDesc, setGoalDesc] = useState('');
  const [goalCategory, setGoalCategory] = useState<FutureGoal['category']>('Education');

  // Interactive High School & College Prep Checklist
  const [prepChecklist, setPrepChecklist] = useState([
    { id: 'c1', task: 'Maintain academic honors & AP Computer Science coursework', completed: true },
    { id: 'c2', task: 'Build & deploy 3 responsive personal web projects in TypeScript', completed: true },
    { id: 'c3', task: 'Prepare creative UI/UX portfolio deck for college applications', completed: false },
    { id: 'c4', task: 'Attend university design lab tours & interactive media workshops', completed: false },
    { id: 'c5', task: 'Participate in regional student hackathons & STEM showcases', completed: true }
  ]);

  const toggleChecklistItem = (id: string) => {
    setPrepChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalYear.trim() || !goalTitle.trim()) return;

    const newGoal: FutureGoal = {
      id: `g_${Date.now()}`,
      year: goalYear.trim(),
      title: goalTitle.trim(),
      description: goalDesc.trim(),
      category: goalCategory,
      status: 'Upcoming'
    };

    onUpdateContent({
      ...content,
      futureGoals: [...content.futureGoals, newGoal]
    });

    setShowAddGoal(false);
    setGoalYear('');
    setGoalTitle('');
    setGoalDesc('');
  };

  const toggleGoalStatus = (id: string) => {
    onUpdateContent({
      ...content,
      futureGoals: content.futureGoals.map(g => {
        if (g.id !== id) return g;
        const nextStatus: FutureGoal['status'] = 
          g.status === 'In Progress' ? 'Milestone' : 
          g.status === 'Milestone' ? 'Upcoming' : 'In Progress';
        return { ...g, status: nextStatus };
      })
    });
  };

  const filteredGoals = goalFilter === 'All' 
    ? content.futureGoals 
    : content.futureGoals.filter(g => g.status === goalFilter);

  const inProgressCount = content.futureGoals.filter(g => g.status === 'In Progress').length;
  const milestoneCount = content.futureGoals.filter(g => g.status === 'Milestone').length;
  const upcomingCount = content.futureGoals.filter(g => g.status === 'Upcoming').length;

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-8 border border-pastel-pink-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#fcbbfa]/25 to-[#95a9e8]/20 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pastel-pink text-[#761c74]">
                Roadmap Step 3
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs font-medium text-slate-600">Aspirations & Future Horizons</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-slate-900">
              My Future & Ambitions
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Brielle Davis' educational roadmap, university goals, and long-term vision in creative software engineering.
            </p>
          </div>

          <button
            onClick={() => setShowAddGoal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone Goal</span>
          </button>
        </div>
      </section>

      {/* Core Aspirations Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Career Aspiration */}
        <div className="bg-white rounded-2xl p-6 border border-soft-blue-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-soft-blue-100 text-[#304485] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Career Horizon</span>
          </div>

          <div>
            <h3 className="text-xl font-serif-display font-bold text-slate-900">
              {content.careerAspiration}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Striving to design and engineer web applications that feel effortless, intuitive, and visually harmonious. Aiming to bridge design systems with scalable frontend engineering.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-md bg-slate-100">Frontend Engineering</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100">UI/UX Systems</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100">Interactive Media</span>
          </div>
        </div>

        {/* Education & Dream College */}
        <div className="bg-white rounded-2xl p-6 border border-pastel-pink-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-pastel-pink-100 text-[#882b86] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Higher Education</span>
          </div>

          <div>
            <h3 className="text-xl font-serif-display font-bold text-slate-900">
              {content.dreamCollege}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Preparing for a four-year collegiate journey specializing in Computer Science, Human-Computer Interaction, and digital creative arts.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
            <span className="px-2.5 py-1 rounded-md bg-slate-100">B.S. Computer Science</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100">STEM Academic Honors</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100">Design Labs</span>
          </div>
        </div>
      </section>

      {/* Quote Card */}
      <section className="bg-gradient-to-r from-soft-blue-50 to-pastel-pink-50 rounded-2xl p-6 border border-slate-200 text-center relative overflow-hidden">
        <Quote className="w-8 h-8 text-[#95a9e8]/50 mx-auto mb-2" />
        <p className="font-serif-display text-lg sm:text-xl font-medium text-slate-800 italic max-w-2xl mx-auto">
          {content.favoriteQuote}
        </p>
        <span className="text-xs font-semibold text-slate-500 block mt-2">
          Guiding Philosophy for High School & Beyond
        </span>
      </section>

      {/* Goals & Milestones Timeline */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-serif-display font-bold text-slate-900">
              Milestone Roadmap Timeline
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any goal status to toggle between 'In Progress', 'Milestone', and 'Upcoming'.
            </p>
          </div>

          {/* Status Metric Badges & Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {(['All', 'In Progress', 'Upcoming', 'Milestone'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setGoalFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  goalFilter === tab
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab}
                {tab === 'In Progress' && ` (${inProgressCount})`}
                {tab === 'Upcoming' && ` (${upcomingCount})`}
                {tab === 'Milestone' && ` (${milestoneCount})`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {filteredGoals.map((goal, index) => {
            const isMilestone = goal.status === 'Milestone';
            const isInProgress = goal.status === 'In Progress';

            return (
              <div key={goal.id} className="relative flex items-start gap-4 sm:gap-6 pl-2">
                {/* Node icon */}
                <button
                  onClick={() => toggleGoalStatus(goal.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform hover:scale-110 shadow-xs ${
                    isMilestone
                      ? 'bg-emerald-500 text-white'
                      : isInProgress
                      ? 'bg-[#95a9e8] text-slate-900 ring-4 ring-soft-blue-100'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                  title="Click to cycle status"
                >
                  {isMilestone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </button>

                {/* Content Card */}
                <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/80 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#354888]">
                      {goal.year}
                    </span>
                    <button
                      onClick={() => toggleGoalStatus(goal.id)}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                        isMilestone
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isInProgress
                          ? 'bg-soft-blue text-[#273872] border-[#7f98e8]'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {goal.status}
                    </button>
                  </div>

                  <h4 className="text-base font-semibold text-slate-900">
                    {goal.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {goal.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="capitalize">Category: {goal.category}</span>
                    <span className="italic">Click badge to cycle progress</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* College Prep Checklist & Core Skills Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive Prep Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-display font-bold text-slate-900 text-base">
                  College Readiness Action Plan
                </h4>
                <p className="text-[11px] text-slate-500">Brielle's active milestones for senior year & admissions</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {prepChecklist.filter(c => c.completed).length}/{prepChecklist.length} Complete
            </span>
          </div>

          <div className="space-y-2.5">
            {prepChecklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  item.completed
                    ? 'bg-emerald-50/40 border-emerald-200/60 text-slate-800'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <span className={`text-xs leading-relaxed ${item.completed ? 'line-through text-slate-400' : 'font-medium'}`}>
                  {item.task}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical & Creative Core Competencies */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-soft-blue-100 text-[#2f4385] flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-display font-bold text-slate-900 text-base">
                  Skills & Focus Competencies
                </h4>
                <p className="text-[11px] text-slate-500">Key tools Brielle is mastering for tech leadership</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-soft-blue-50/60 border border-soft-blue-200/60">
              <strong className="block text-slate-900 font-semibold mb-1">Frontend Engineering</strong>
              <p className="text-[11px] text-slate-600">TypeScript, React, Vite, responsive CSS & component architectures.</p>
            </div>

            <div className="p-3 rounded-xl bg-pastel-pink-50/60 border border-pastel-pink-200/60">
              <strong className="block text-slate-900 font-semibold mb-1">UI/UX Design Systems</strong>
              <p className="text-[11px] text-slate-600">Figma prototyping, pastel palettes, typography, accessibility.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-slate-900 font-semibold mb-1">Algorithms & Math</strong>
              <p className="text-[11px] text-slate-600">AP CS curriculum, data structures, and algorithmic logic.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="block text-slate-900 font-semibold mb-1">Creative Media</strong>
              <p className="text-[11px] text-slate-600">Photography, digital storytelling, music composition & focus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-serif-display font-bold text-slate-900">Add Milestone Goal</h3>
            <form onSubmit={handleAddGoal} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Timeframe / Target Year *</label>
                <input
                  type="text"
                  required
                  value={goalYear}
                  onChange={(e) => setGoalYear(e.target.value)}
                  placeholder="e.g. 2027 or College Sophomore"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Goal Title *</label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Study Abroad or Publish First App"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                >
                  <option value="Education">Education</option>
                  <option value="Career">Career</option>
                  <option value="Personal">Personal</option>
                  <option value="Skill">Skill</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={goalDesc}
                  onChange={(e) => setGoalDesc(e.target.value)}
                  placeholder="Elaborate on what achievement looks like..."
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-pastel-pink text-slate-900 font-semibold hover:bg-pastel-pink/80"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Next Up Navigation */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Next Up in Roadmap:</span>
          <h4 className="font-serif-display font-bold text-slate-900 text-lg">Roadmap Step 4: Music Page</h4>
          <p className="text-xs text-slate-600">Explore heavy rotation playlists, favorite artists, and interactive player.</p>
        </div>
        <button
          onClick={() => onNavigate('music')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Go to Music Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
