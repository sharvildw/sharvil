import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Layout, Download, Server, Cpu, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

const TYPED_LINES = [
  { text: "const developer = {", color: "text-foreground/80" },
  { key: "  name:", val: "'Sharvil Waghmare'", keyColor: "text-primary/80", valColor: "text-green-400" },
  { key: "  role:", val: "'Full-Stack Developer'", keyColor: "text-primary/80", valColor: "text-green-400" },
  { key: "  stack:", val: "['React', 'Node', 'MongoDB']", keyColor: "text-primary/80", valColor: "text-yellow-300" },
  { key: "  learning:", val: "['AI/ML', 'Cloud']", keyColor: "text-primary/80", valColor: "text-cyan-400" },
  { key: "  hardWorker:", val: "true", keyColor: "text-primary/80", valColor: "text-orange-400" },
  { key: "  openToWork:", val: "true", keyColor: "text-primary/80", valColor: "text-orange-400" },
  { text: "};", color: "text-foreground/80" },
];

const TECH_ICONS = [
  { Icon: Code2,   label: 'React',    color: 'text-cyan-400'  },
  { Icon: Server,  label: 'Node.js',  color: 'text-green-400' },
  { Icon: Database,label: 'MongoDB',  color: 'text-emerald-400'},
  { Icon: Globe,   label: 'REST API', color: 'text-blue-400'  },
  { Icon: Cpu,     label: 'AI/ML',    color: 'text-purple-400'},
  { Icon: Layout,  label: 'UI/UX',    color: 'text-pink-400'  },
];

const BADGES = [
  { label: 'React Developer',    dot: 'bg-blue-400',   shadow: 'shadow-blue-400/40',   pos: 'absolute -top-6 -left-6',    anim: { y: [-8, 8, -8] }, dur: 4 },
  { label: 'MERN Learner',       dot: 'bg-yellow-400', shadow: 'shadow-yellow-400/40',  pos: 'absolute top-4 -right-8',   anim: { y: [8, -8, 8] },  dur: 5 },
  { label: 'Backend Enthusiast', dot: 'bg-green-400',  shadow: 'shadow-green-400/40',   pos: 'absolute -bottom-8 -right-6',anim: { y: [-6, 6, -6] }, dur: 4.5 },
  { label: 'AI Explorer',        dot: 'bg-purple-400', shadow: 'shadow-purple-400/40',  pos: 'absolute bottom-10 -left-8', anim: { y: [6, -6, 6] },  dur: 3.5 },
];

export const Hero = () => {
  const [profile, setProfile] = useState<any>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/profile`);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  // Typewriter effect — reveal lines one by one
  useEffect(() => {
    if (visibleLines >= TYPED_LINES.length) return;
    const timer = setTimeout(() => setVisibleLines(v => v + 1), 300);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const name          = profile?.name         || 'Sharvil Waghmare';
  const tagline       = profile?.heroTagline  || 'A passionate Computer Engineering student focused on building modern web applications, exploring Artificial Intelligence, and crafting elegant frontend experiences.';
  const projectsCount = profile?.projectsCount || '10+';
  const yearsExp      = profile?.yearsExperience || '2+';
  const availableFor  = profile?.availableFor  || 'Internship';
  const resumeUrl     = profile?.resumeUrl     || '/resume.pdf';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: Text content ── */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          {/* Available badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium">Available for {availableFor}</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{name}</span>.
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">{tagline}</p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#projects" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center space-x-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-secondary/80 text-secondary-foreground font-medium flex items-center space-x-2 hover:bg-secondary transition-all border border-border/50 hover:-translate-y-0.5 shadow-sm">
              <span>Resume</span>
              <Download className="w-4 h-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground border-t border-border/50 pt-8 max-w-md">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground mb-1">{projectsCount}</span>
              <span>Projects Built</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground mb-1">{yearsExp}</span>
              <span>Years Coding</span>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block" />
            <div className="hidden sm:flex flex-col">
              <span className="text-3xl font-bold text-foreground mb-1">100%</span>
              <span>Commitment</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Visual Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Floating badges */}
          {BADGES.map((badge) => (
            <motion.div
              key={badge.label}
              animate={badge.anim}
              transition={{ duration: badge.dur, repeat: Infinity, ease: 'easeInOut' }}
              className={`${badge.pos} z-20 bg-card/90 backdrop-blur-md border border-border/60 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${badge.dot} shadow-lg ${badge.shadow}`} />
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{badge.label}</span>
            </motion.div>
          ))}

          {/* Main card */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="bg-gradient-to-tr from-primary/15 via-background/60 to-blue-500/10 rounded-3xl border border-border/40 backdrop-blur-xl p-7 shadow-2xl shadow-primary/10">

              {/* Card top bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Code2 className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">developer.js</div>
                    <div className="text-[10px] text-muted-foreground">portfolio/src</div>
                  </div>
                </div>
                {/* Traffic light dots */}
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
              </div>

              {/* Code block */}
              <div className="bg-black/30 dark:bg-black/40 rounded-2xl border border-white/5 p-5 font-mono text-sm mb-6 min-h-[200px]">
                {TYPED_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="leading-7"
                  >
                    {'text' in line ? (
                      <span className={line.color}>{line.text}</span>
                    ) : (
                      <span>
                        <span className={line.keyColor}>{line.key} </span>
                        <span className={line.valColor}>{line.val}</span>
                        {i < TYPED_LINES.length - 2 && <span className="text-foreground/40">,</span>}
                      </span>
                    )}
                  </motion.div>
                ))}
                {/* blinking cursor */}
                {visibleLines < TYPED_LINES.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary rounded-sm ml-1 align-middle"
                  />
                )}
              </div>

              {/* Tech icon grid */}
              <div className="grid grid-cols-6 gap-2">
                {TECH_ICONS.map(({ Icon, label, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    title={label}
                    className="flex flex-col items-center gap-1 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-secondary/60 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors">
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <span className="text-[9px] text-muted-foreground font-medium leading-tight text-center">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
