import { motion } from 'framer-motion';
import { Terminal, Code2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

export const About = () => {
  const [profile, setProfile] = useState<any>(null);

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

  const name = profile?.name || 'Sharvil Waghmare';
  const profileImage = profile?.profileImage || '/profile.png';
  const aboutText = profile?.aboutText || "I am a driven Computer Engineering student with a deep passion for technology and innovation. I specialize in building modern, scalable web applications and exploring cutting-edge domains like Artificial Intelligence.\n\nMy journey in tech is fueled by curiosity. I love turning complex problems into elegant, user-friendly solutions. From crafting pixel-perfect frontend experiences to architecting robust backend systems, I enjoy every part of the development lifecycle.";
  const aboutHighlight = profile?.aboutHighlight || "When I'm not coding, I'm constantly learning about new tools, engaging with the developer community, or brainstorming my next big project. I am actively looking for internship opportunities to apply my skills and grow as an engineer.";
  const yearsExp = profile?.yearsExperience || '2+';
  const projectsCount = profile?.projectsCount || '10+';
  return (
    <section id="about" className="py-24 relative bg-background overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center md:text-left">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Who Am I</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto md:mx-0"></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image & Decorative Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative flex justify-center lg:justify-start">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[2rem] rotate-3 scale-105 -z-10 blur-sm"></div>
              <img 
                src={profileImage} 
                alt={name} 
                className="rounded-[2rem] w-full max-w-md object-cover shadow-2xl border border-border/50 aspect-[4/5] relative z-10"
              />
              
              {/* Floating Element - matching the screenshot vibe */}
              <div className="absolute -bottom-8 -right-8 bg-card/60 backdrop-blur-xl border border-border/50 p-6 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">MERN Learner</h4>
                    <p className="text-sm text-muted-foreground font-mono">Frontend & Backend</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Text Content in Glass Card */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-primary w-6 h-6" />
                <h3 className="text-2xl font-bold">My Story</h3>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {aboutText.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-4">
                  <Sparkles className="text-primary w-6 h-6 shrink-0 mt-1" />
                  <p className="text-foreground/90 font-medium text-base">
                    {aboutHighlight}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-border/50">
                <div>
                  <h4 className="text-3xl font-bold text-foreground mb-1">{yearsExp}</h4>
                  <p className="text-sm text-muted-foreground">Years Coding</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-foreground mb-1">{projectsCount}</h4>
                  <p className="text-sm text-muted-foreground">Projects Built</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
