import React, { useState, useEffect, useRef } from 'react';
import { SiteContent, SongItem } from '../data/siteData';
import { 
  Music2, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Disc, 
  Plus, 
  Radio, 
  Sparkles, 
  Headphones,
  ArrowRight,
  Shuffle,
  Repeat,
  ExternalLink,
  VolumeX
} from 'lucide-react';

interface MusicPageProps {
  content: SiteContent;
  onUpdateContent: (newContent: SiteContent) => void;
  onNavigate: (page: string) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({
  content,
  onUpdateContent,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(45);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showAddTrack, setShowAddTrack] = useState(false);

  // New Track state
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const [trackAlbum, setTrackAlbum] = useState('');
  const [trackGenre, setTrackGenre] = useState('Indie Pop');
  const [trackCover, setTrackCover] = useState('');

  // Web Audio Context for synthesized relaxing ambient lo-fi sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<any>(null);

  const currentSong = content.musicList.find(s => s.id === content.currentlyPlayingId) || content.musicList[0];

  // Synthesize relaxing lo-fi ambient notes when playing
  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current && AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Pentatonic frequencies for pleasant ambient chords
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
        let noteIndex = 0;

        synthTimerRef.current = setInterval(() => {
          if (!audioCtxRef.current || isMuted || volume === 0) return;
          const ctx = audioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          const freq = notes[noteIndex % notes.length];
          noteIndex = (noteIndex + 1) % notes.length;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const actualVol = isMuted ? 0 : (volume / 100) * 0.08;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(actualVol, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.3);
        }, 1100);
      } catch (e) {
        console.warn('Web Audio playback error', e);
      }
    } else {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    }

    return () => {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    };
  }, [isPlaying, volume, isMuted]);

  // Simulated progress timer when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressSec(prev => {
          if (prev >= 210) {
            if (isRepeat) {
              return 0;
            } else {
              handleNext();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isRepeat, currentSong]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleSelectSong = (song: SongItem) => {
    onUpdateContent({
      ...content,
      currentlyPlayingId: song.id
    });
    setIsPlaying(true);
    setProgressSec(0);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateContent({
      ...content,
      musicList: content.musicList.map(s => 
        s.id === id ? { ...s, favorite: !s.favorite } : s
      )
    });
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * content.musicList.length);
      handleSelectSong(content.musicList[randomIndex]);
      return;
    }
    const currentIndex = content.musicList.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % content.musicList.length;
    handleSelectSong(content.musicList[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = content.musicList.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + content.musicList.length) % content.musicList.length;
    handleSelectSong(content.musicList[prevIndex]);
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTitle.trim() || !trackArtist.trim()) return;

    const newSong: SongItem = {
      id: `s_${Date.now()}`,
      title: trackTitle.trim(),
      artist: trackArtist.trim(),
      album: trackAlbum.trim() || 'Single',
      duration: '3:15',
      coverUrl: trackCover.trim() || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      genre: trackGenre,
      favorite: true
    };

    onUpdateContent({
      ...content,
      musicList: [...content.musicList, newSong]
    });

    setShowAddTrack(false);
    setTrackTitle('');
    setTrackArtist('');
    setTrackAlbum('');
    setTrackCover('');
  };

  // Genres list
  const genres = ['All', 'Indie Pop', 'Lo-Fi / Ambient', 'Synth Wave', 'Acoustic Folk', 'Dream Pop'];

  const filteredMusic = content.musicList
    .filter(s => selectedGenre === 'All' || s.genre === selectedGenre)
    .filter(s => !onlyFavorites || s.favorite);

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-8 border border-soft-blue-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#95a9e8]/25 to-[#fcbbfa]/25 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-soft-blue text-[#2e3e77]">
                Roadmap Step 4
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs font-medium text-slate-600">Soundtrack & Inspiration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-slate-900">
              Music & Heavy Rotation
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore the sounds, indie playlists, and ambient beats that power Brielle's coding sessions and creative workflows.
            </p>
          </div>

          <button
            onClick={() => setShowAddTrack(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Favorite Track</span>
          </button>
        </div>
      </section>

      {/* Featured Interactive Player Card */}
      <section className="bg-gradient-to-br from-white via-white to-soft-blue-50/60 rounded-3xl p-6 sm:p-8 border-2 border-soft-blue shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Album Vinyl / Cover Art */}
          <div className="relative group shrink-0">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80';
                }}
              />
              {isPlaying && (
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fcbbfa]"></span>
                  <span>Now Playing</span>
                </div>
              )}
            </div>

            {/* Vinyl record silhouette peek */}
            <div className={`absolute -right-4 top-2 bottom-2 w-14 rounded-full bg-slate-950 border border-slate-800 -z-10 shadow-md flex items-center justify-center transition-transform ${isPlaying ? 'translate-x-3 rotate-45' : ''}`}>
              <div className="w-4 h-4 rounded-full bg-soft-blue"></div>
            </div>
          </div>

          {/* Player Controls & Info */}
          <div className="flex-1 w-full space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#95a9e8]/30 text-[#29396e] font-semibold">
                    {currentSong.genre}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-medium">{currentSong.album}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-slate-900">
                  {currentSong.title}
                </h2>
                <p className="text-sm font-medium text-slate-600">
                  {currentSong.artist}
                </p>
              </div>

              {/* Animated Equalizer Visualizer */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-8 px-3 py-1.5 rounded-xl bg-slate-900/5">
                  <span className="w-1 bg-[#95a9e8] rounded-full animate-bounce h-5"></span>
                  <span className="w-1 bg-[#fcbbfa] rounded-full animate-pulse h-7"></span>
                  <span className="w-1 bg-[#95a9e8] rounded-full animate-bounce h-4"></span>
                  <span className="w-1 bg-[#fcbbfa] rounded-full animate-pulse h-6"></span>
                  <span className="w-1 bg-[#95a9e8] rounded-full animate-bounce h-3"></span>
                </div>
              )}
            </div>

            {/* Scrubber Bar */}
            <div className="space-y-1.5">
              <div 
                className="w-full h-2 rounded-full bg-slate-200 cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  setProgressSec(Math.floor(ratio * 210));
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#95a9e8] to-[#fcbbfa] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (progressSec / 210) * 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>{formatTime(progressSec)}</span>
                <span className="text-[11px] text-slate-400">
                  {isPlaying ? 'Ambient chime active' : 'Click play for audio'}
                </span>
                <span>{currentSong.duration}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2 rounded-xl text-xs transition-colors ${
                    isShuffle ? 'bg-soft-blue text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-800'
                  }`}
                  title="Shuffle mode"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Previous song"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-sm transition-all hover:scale-105"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  title="Next song"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-2 rounded-xl text-xs transition-colors ${
                    isRepeat ? 'bg-pastel-pink text-[#7c207a] font-bold' : 'text-slate-400 hover:text-slate-800'
                  }`}
                  title="Repeat track"
                >
                  <Repeat className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => toggleFavorite(currentSong.id, e)}
                  className={`p-2 rounded-xl transition-colors ${
                    currentSong.favorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500'
                  }`}
                  title="Favorite track"
                >
                  <Heart className={`w-5 h-5 ${currentSong.favorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-slate-800"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-20 accent-[#95a9e8] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Grid & Filtering */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-serif-display font-bold text-slate-900">
              Curated Playlist Catalog
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any track to load into the active playback deck.
            </p>
          </div>

          {/* Genre Filters & Favorites Only */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {genres.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedGenre === g
                    ? 'bg-soft-blue text-slate-900 font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition-all ${
                onlyFavorites
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Heart className={`w-3 h-3 ${onlyFavorites ? 'fill-current' : ''}`} />
              <span>Favorites Only</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredMusic.map((song, index) => {
            const isCurrent = song.id === currentSong.id;

            return (
              <div
                key={song.id}
                onClick={() => handleSelectSong(song)}
                className={`p-3.5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all border ${
                  isCurrent
                    ? 'bg-soft-blue-50 border-soft-blue text-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50/80 border-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                  <span className="text-xs font-bold text-slate-400 w-4 text-center">
                    {index + 1}
                  </span>

                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80';
                    }}
                  />

                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-sm truncate text-slate-900">
                      {song.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {song.artist} · <span className="italic">{song.album}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden md:inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {song.genre}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    {song.duration}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(song.id, e)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      song.favorite ? 'text-rose-500' : 'text-slate-300 hover:text-slate-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${song.favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Music Reflection Note */}
      <section className="bg-gradient-to-r from-soft-blue-50 to-pastel-pink-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[#455ba6] flex items-center justify-center shrink-0 shadow-xs">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs text-slate-700 leading-relaxed">
            <h4 className="text-sm font-serif-display font-bold text-slate-900">
              Why Music Powers My Development
            </h4>
            <p>
              "Coding for me is rhythm and focus. When I put on my headphones, whether it's upbeat indie riffs or ambient lo-fi, complex algorithms and responsive layouts transform into creative art. Music turns problem-solving into play." — Brielle Davis
            </p>
          </div>
        </div>
      </section>

      {/* Add Track Modal */}
      {showAddTrack && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-serif-display font-bold text-slate-900">Add Song to Music Catalog</h3>
            <form onSubmit={handleAddSong} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Song Title *</label>
                <input
                  type="text"
                  required
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="e.g. Daylight Reflections"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Artist *</label>
                <input
                  type="text"
                  required
                  value={trackArtist}
                  onChange={(e) => setTrackArtist(e.target.value)}
                  placeholder="e.g. Taylor Swift or Lo-Fi Artist"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Album</label>
                <input
                  type="text"
                  value={trackAlbum}
                  onChange={(e) => setTrackAlbum(e.target.value)}
                  placeholder="Album Title"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Genre</label>
                <select
                  value={trackGenre}
                  onChange={(e) => setTrackGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                >
                  <option value="Indie Pop">Indie Pop</option>
                  <option value="Lo-Fi / Ambient">Lo-Fi / Ambient</option>
                  <option value="Acoustic Folk">Acoustic Folk</option>
                  <option value="Synth Wave">Synth Wave</option>
                  <option value="R&B / Soul">R&B / Soul</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Album Cover Image URL</label>
                <input
                  type="url"
                  value={trackCover}
                  onChange={(e) => setTrackCover(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTrack(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-soft-blue text-slate-900 font-semibold hover:bg-soft-blue/80"
                >
                  Add Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Next Up in Roadmap */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Final Roadmap Step:</span>
          <h4 className="font-serif-display font-bold text-slate-900 text-lg">Roadmap Step 5: Admin Dashboard</h4>
          <p className="text-xs text-slate-600">Review form submissions, edit live biography & site settings.</p>
        </div>
        <button
          onClick={() => onNavigate('admin')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>Go to Admin Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
