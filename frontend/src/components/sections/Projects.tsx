import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

const STATIC_PROJECTS = [
  {
    _id: '1',
    title: 'WorkLink',
    description: 'A neighborhood hiring platform to connect with verified skilled workers instantly. Designed for seamless local marketplace interactions.',
    image: '/projects/worklink.png',
    techStack: ['React', 'Web Design', 'Marketplace'],
    githubUrl: 'https://github.com/sharvildw/worklink',
    liveUrl: 'https://worklink1.netlify.app/pages/index.html'
  },
  {
    _id: '2',
    title: 'Dr. Alpana P. Adsul Portfolio',
    description: 'Professional academic portfolio for Dr. Alpana Prashant Adsul, Professor & Head of Computer Engineering, showcasing research and teaching experience.',
    image: '/projects/dralpanaadsul.png',
    techStack: ['Web Design', 'Portfolio', 'Academic'],
    githubUrl: 'https://github.com/sharvildw/hod_Maam_portfolio',
    liveUrl: 'https://dralpanaadsul.dypcoeifaculty.in/'
  },
  {
    _id: '3',
    title: 'Dr. Suresh N. Mali Portfolio',
    description: 'Academic and professional portfolio for Dr. Suresh N. Mali, detailing over 38+ years of experience, publications, and patents.',
    image: '/projects/drsureshmali.png',
    techStack: ['Frontend', 'Responsive', 'Portfolio'],
    githubUrl: '#',
    liveUrl: 'https://drsureshmali.in/'
  },
  {
    _id: '4',
    title: 'UBPARAMS',
    description: 'Union Bank Pensioners & Retirees Association Maharashtra State website, a platform for serving and empowering banking veterans.',
    image: '/projects/ubparams.png',
    techStack: ['Web App', 'Community', 'Organization'],
    githubUrl: '#',
    liveUrl: 'https://ubparams.org/'
  },
  {
    _id: '5',
    title: 'Anime Auction',
    description: 'A dedicated platform to bid on rare, limited edition, and exclusive anime merchandise. Join the ultimate anime auction experience.',
    image: '/projects/animeauction.png',
    techStack: ['React', 'Web App', 'Auction'],
    githubUrl: 'https://github.com/sharvildw/auction-website',
    liveUrl: 'https://swanimeauction.netlify.app/'
  },
  {
    _id: '6',
    title: 'Modern Portfolio',
    description: 'A highly polished, futuristic, and responsive full-stack portfolio platform built using React, Vite, TypeScript, and Framer Motion.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    githubUrl: 'https://github.com/sharvildw/Portfolio',
    liveUrl: '#'
  }
];

export const Projects = () => {
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/projects`);
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects from backend. Using static fallback.', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative bg-background overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">My Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div key={project._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.5 }} viewport={{ once: true }}
              className="group relative rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col">
              
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                
                {/* Overlay Links on Hover */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2.5 bg-background/90 backdrop-blur-md rounded-full text-foreground hover:text-primary hover:scale-110 transition-all shadow-xl">
                      <FaGithub className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2.5 bg-primary/90 backdrop-blur-md rounded-full text-primary-foreground hover:bg-primary hover:scale-110 transition-all shadow-xl">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow relative">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50 mt-auto">
                  {project.techStack && project.techStack.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-secondary text-foreground border border-border/50 group-hover:border-primary/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
