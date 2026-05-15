import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative bg-background overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-0 -z-10 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">My Journey</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & Education</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold">Education</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
              
              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-primary/50 group-hover:after:border-primary group-hover:after:bg-primary after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-20 h-7 mb-3 sm:mb-0 text-primary bg-primary/10 rounded-full shadow-sm">2024-28</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-all shadow-sm hover:shadow-xl w-full group-hover:-translate-y-1">
                    <div className="text-xl font-bold text-foreground mb-2">B.E Computer Engineering</div>
                    <div className="text-primary font-medium mb-3">Dr. D. Y. Patil College of Engineering & Innovation</div>
                    <div className="inline-block px-3 py-1 bg-secondary/80 rounded-lg text-sm text-foreground font-mono">Sem I: 8.86 SGPA | Sem II: 9.14 SGPA</div>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-border group-hover:after:border-primary/80 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-20 h-7 mb-3 sm:mb-0 text-muted-foreground bg-secondary rounded-full">2024</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-primary/30 transition-all shadow-sm hover:shadow-md w-full">
                    <div className="text-xl font-bold text-foreground mb-2">HSC (12th)</div>
                    <div className="text-muted-foreground mb-3">Maharashtra Board</div>
                    <div className="inline-block px-3 py-1 bg-secondary/80 rounded-lg text-sm text-foreground font-mono">Score: 69%</div>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-border group-hover:after:border-primary/80 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-20 h-7 mb-3 sm:mb-0 text-muted-foreground bg-secondary rounded-full">2022</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-primary/30 transition-all shadow-sm hover:shadow-md w-full">
                    <div className="text-xl font-bold text-foreground mb-2">SSC (10th)</div>
                    <div className="text-muted-foreground mb-3">Maharashtra Board</div>
                    <div className="inline-block px-3 py-1 bg-secondary/80 rounded-lg text-sm text-foreground font-mono">Score: 93%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold">Experience</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500/50 before:via-border before:to-transparent">
              
              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-purple-500/50 group-hover:after:border-purple-500 group-hover:after:bg-purple-500 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-24 h-7 mb-3 sm:mb-0 text-purple-500 bg-purple-500/10 rounded-full shadow-sm">2026-Pres</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-purple-500/50 transition-all shadow-sm hover:shadow-xl w-full group-hover:-translate-y-1">
                    <div className="text-xl font-bold text-foreground mb-2">Incubation Centre Member</div>
                    <div className="text-purple-500 font-medium mb-4">DYPCOEI Talegaon</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start"><span className="text-purple-500 mr-2">▹</span> Active member of the college Incubation Centre, fostering innovation and startups.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-purple-500/50 group-hover:after:border-purple-500 group-hover:after:bg-purple-500 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-24 h-7 mb-3 sm:mb-0 text-purple-500 bg-purple-500/10 rounded-full shadow-sm">2026-Pres</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-purple-500/50 transition-all shadow-sm hover:shadow-xl w-full group-hover:-translate-y-1">
                    <div className="text-xl font-bold text-foreground mb-2">IEEE Member</div>
                    <div className="text-purple-500 font-medium mb-4">IEEE Student Branch</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start"><span className="text-purple-500 mr-2">▹</span> Participating in IEEE events, workshops, and technical discussions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-32 py-2 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-3 after:h-3 after:bg-background after:border-4 after:box-content after:border-border group-hover:after:border-primary/80 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 after:transition-all after:duration-300">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-bold uppercase w-24 h-7 mb-3 sm:mb-0 text-muted-foreground bg-secondary rounded-full">2025-Pres</time>
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-primary/30 transition-all shadow-sm hover:shadow-md w-full">
                    <div className="text-xl font-bold text-foreground mb-2">Operations & Documentation</div>
                    <div className="text-muted-foreground mb-4">E-Cell, DYPCOEI Talegaon</div>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start"><span className="text-primary mr-2">▹</span> Supported planning and execution of entrepreneurship events.</li>
                      <li className="flex items-start"><span className="text-primary mr-2">▹</span> Prepared official documentation and reports.</li>
                      <li className="flex items-start"><span className="text-primary mr-2">▹</span> Coordinated with team members for smooth workflows.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
