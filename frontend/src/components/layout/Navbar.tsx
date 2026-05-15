import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Terminal className="text-primary w-6 h-6" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Sharvil Waghmare</span>
        </Link>
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
          <div className="flex space-x-4 pl-6 border-l border-border items-center">
            <a href="https://github.com/sharvildw" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sharvilw" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/sharvil_013" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};
