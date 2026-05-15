import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Wrench,
  Layout,
  Terminal,
  Server
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

const STATIC_SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: "Layout",
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: 'React.js', level: 65 },
      { name: 'JavaScript', level: 65 },
      { name: 'HTML5', level: 80 },
      { name: 'CSS3', level: 75 },
    ]
  },
  {
    title: "Backend & Database",
    icon: "Database",
    color: "from-green-500 to-emerald-400",
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'Express.js', level: 70 },
      { name: 'MongoDB', level: 70 },
      { name: 'MySQL', level: 80 },
      { name: 'Backend Core', level: 60 },
    ]
  },
  {
    title: "Languages",
    icon: "Code2",
    color: "from-purple-500 to-pink-400",
    skills: [
      { name: 'Python', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'C Programming', level: 60 },
    ]
  },
  {
    title: "Tools & Deployment",
    icon: "Wrench",
    color: "from-orange-500 to-amber-400",
    skills: [
      { name: 'Git & VCS', level: 50 },
      { name: 'Hosting', level: 60 },
      { name: 'Deployment', level: 60 },
    ]
  }
];

const renderIcon = (iconName: string) => {
  switch(iconName) {
    case 'Layout': return <Layout className="w-6 h-6" />;
    case 'Database': return <Database className="w-6 h-6" />;
    case 'Code2': return <Code2 className="w-6 h-6" />;
    case 'Wrench': return <Wrench className="w-6 h-6" />;
    case 'Terminal': return <Terminal className="w-6 h-6" />;
    case 'Server': return <Server className="w-6 h-6" />;
    default: return <Code2 className="w-6 h-6" />;
  }
};

export const Skills = () => {
  const [categories, setCategories] = useState<any[]>(STATIC_SKILL_CATEGORIES);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/skills`);
        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            title: d.category,
            icon: d.icon,
            color: d.color,
            skills: d.skills
          }));
          setCategories(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch skills', error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-16 text-center"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">My Expertise</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div 
              key={category.title} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1, duration: 0.5 }} 
              viewport={{ once: true }}
              className="bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-background shadow-sm border border-border/50 text-foreground group-hover:scale-110 transition-transform duration-300`}>
                  {renderIcon(category.icon)}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill: any, sIdx: number) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                      <span className="text-muted-foreground font-mono font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${skill.level}%` }} 
                        transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
