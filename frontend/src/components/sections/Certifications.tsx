import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, FileText, Image as ImageIcon, TrendingUp, BookOpen, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

const STATIC_CERTIFICATIONS = [
  { _id: "1", title: 'Python for Data Science', issuer: 'NPTEL', date: 'Jan–Feb 2025', link: '' },
  { _id: "2", title: 'Generative AI Content Creation', issuer: 'Coursera / Adobe', date: 'Dec 2025', link: '' },
  { _id: "3", title: 'Software Engineering Job Simulation', issuer: 'Forage', date: 'Oct 2025', link: '' }
];

// Color map for known issuers
const ISSUER_COLORS: Record<string, string> = {
  'nptel':              'from-orange-500 to-amber-400',
  'coursera':           'from-blue-500 to-cyan-400',
  'coursera / adobe':   'from-blue-500 to-cyan-400',
  'adobe':              'from-red-500 to-pink-400',
  'adobe learning manager': 'from-red-500 to-pink-400',
  'forage':             'from-green-500 to-emerald-400',
  'hackerrank':         'from-green-400 to-teal-400',
  'google cloud':       'from-blue-400 to-indigo-500',
  'e-cell, iit bombay': 'from-purple-500 to-violet-400',
  'unknown':            'from-slate-500 to-slate-400',
};

const getIssuerColor = (issuer: string) =>
  ISSUER_COLORS[issuer.toLowerCase()] ?? 'from-primary to-blue-400';

const PLATFORMS = [
  { name: 'NPTEL', color: '#f97316' },
  { name: 'Coursera', color: '#2563eb' },
  { name: 'Adobe', color: '#ef4444' },
  { name: 'Forage', color: '#22c55e' },
  { name: 'HackerRank', color: '#10b981' },
  { name: 'Google Cloud', color: '#6366f1' },
  { name: 'IIT Bombay', color: '#a855f7' },
];

export const Certifications = () => {
  const [certifications, setCertifications] = useState<any[]>(STATIC_CERTIFICATIONS);
  const [preview, setPreview] = useState<{ link: string; title: string; type: 'pdf' | 'image' } | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/certifications`);
        if (data && data.length > 0) setCertifications(data);
      } catch (error) {
        console.error('Failed to fetch certifications', error);
      }
    };
    fetchCertifications();
  }, []);

  const getFileType = (link: string): 'pdf' | 'image' => {
    const ext = link.split('.').pop()?.toLowerCase();
    return ext === 'pdf' ? 'pdf' : 'image';
  };

  const handleView = (cert: any) => {
    const type = getFileType(cert.link);
    setPreview({ link: cert.link, title: cert.title, type });
  };

  // Unique issuers for filter tabs
  const uniqueIssuers = ['All', ...Array.from(new Set(certifications.map(c => c.issuer).filter(Boolean)))];

  const filtered = filter === 'All'
    ? certifications
    : certifications.filter(c => c.issuer === filter);

  const stats = [
    { icon: Award,      value: `${certifications.length}+`, label: 'Certificates Earned' },
    { icon: BookOpen,   value: `${uniqueIssuers.length - 1}`,  label: 'Platforms & Bodies'  },
    { icon: TrendingUp, value: '2025–26',                    label: 'Most Active Period'   },
    { icon: Star,       value: 'AI & Dev',                   label: 'Top Focus Areas'      },
  ];

  return (
    <>
      <section id="certifications" className="py-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 -z-10 bg-secondary/5" />

        <div className="container mx-auto px-6 relative z-10">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Achievements</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              A collection of professional certifications and course completions spanning AI, full-stack development,
              cloud computing, and entrepreneurship — earned through globally recognized platforms.
            </p>
          </motion.div>

          {/* ── Stats Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-card/40 border border-border/50 rounded-2xl p-5 flex flex-col items-center text-center backdrop-blur-xl hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── Platform Badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {PLATFORMS.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border/60 bg-card/30 text-foreground backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color }} />
                {p.name}
              </span>
            ))}
          </motion.div>

          {/* ── Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {uniqueIssuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilter(issuer)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  filter === issuer
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                    : 'bg-card/30 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {issuer}
              </button>
            ))}
          </motion.div>

          {/* ── Certificate Grid ── */}
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cert, idx) => {
                const hasLink = cert.link && cert.link !== '#' && cert.link !== '';
                const fileType = hasLink ? getFileType(cert.link) : null;
                const gradientColor = getIssuerColor(cert.issuer || '');

                return (
                  <motion.div
                    key={cert._id || cert.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 group flex flex-col overflow-hidden"
                  >
                    {/* Top accent gradient bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${gradientColor}`} />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Icon + file type */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`text-white bg-gradient-to-br ${gradientColor} w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform shadow-md`}>
                          <Award className="w-6 h-6" />
                        </div>
                        {fileType && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/50">
                            {fileType === 'pdf' ? <FileText className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                            {fileType}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors leading-snug">{cert.title}</h3>
                      <p className="font-semibold text-sm mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">{cert.issuer}</p>
                      <div className="text-xs text-muted-foreground mb-4 font-mono">{cert.date}</div>

                      {hasLink ? (
                        <div className="mt-auto">
                          <button
                            onClick={() => handleView(cert)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                          >
                            View Certificate <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="mt-auto">
                          <span className="text-xs text-muted-foreground italic">Physical / No digital link</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {/* ── Empty state ── */}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No certificates found for this filter.</p>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <p className="text-muted-foreground text-sm mb-4">
              Continuously upskilling — always learning something new.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-primary/5 text-primary font-medium text-sm">
              <TrendingUp className="w-4 h-4" />
              Actively pursuing new certifications in 2026
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Certificate Preview Modal ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-card border border-border rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-semibold text-foreground truncate">{preview.title}</h3>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={preview.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Open in Tab <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setPreview(null)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto bg-black/10 min-h-[60vh]">
                {preview.type === 'pdf' ? (
                  <iframe
                    src={preview.link}
                    title={preview.title}
                    className="w-full h-full min-h-[70vh]"
                    style={{ border: 'none' }}
                  />
                ) : (
                  <div className="flex items-center justify-center p-8 h-full min-h-[70vh]">
                    <img
                      src={preview.link}
                      alt={preview.title}
                      className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
