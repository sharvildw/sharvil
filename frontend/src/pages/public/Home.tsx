import { Navbar } from '../../components/layout/Navbar';
import { Hero } from '../../components/sections/Hero';
import { About } from '../../components/sections/About';
import { Skills } from '../../components/sections/Skills';
import { Projects } from '../../components/sections/Projects';
import { Experience } from '../../components/sections/Experience';
import { Certifications } from '../../components/sections/Certifications';
import { Contact } from '../../components/sections/Contact';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        <p>© {new Date().getFullYear()} Sharvil Waghmare. All rights reserved.</p>
      </footer>
    </div>
  );
};
