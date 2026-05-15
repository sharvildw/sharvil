import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE from '../../lib/api';
import { 
  LogOut, 
  LayoutDashboard, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  Award, 
  Mail, 
  User 
} from 'lucide-react';

import { AdminProjects } from './tabs/AdminProjects';
import { AdminSkills } from './tabs/AdminSkills';
import { AdminExperiences } from './tabs/AdminExperiences';
import { AdminCertifications } from './tabs/AdminCertifications';
import { AdminMessages } from './tabs/AdminMessages';
import { AdminProfile } from './tabs/AdminProfile';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`);
      localStorage.removeItem('adminToken');
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed', error);
      localStorage.removeItem('adminToken');
      navigate('/admin');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: <User className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience & Ed', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-5 h-5" /> },
    { id: 'messages', label: 'Messages', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/50 hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3 border-b border-border/50">
          <LayoutDashboard className="text-primary w-6 h-6" />
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground font-semibold shadow-lg' 
                  : 'hover:bg-secondary text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center mb-8 bg-card border border-border/50 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-primary w-5 h-5" />
            <h1 className="text-lg font-bold">Admin</h1>
          </div>
          <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-500 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
           {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-background">
          {activeTab === 'profile' && <AdminProfile />}
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'skills' && <AdminSkills />}
          {activeTab === 'experience' && <AdminExperiences />}
          {activeTab === 'certifications' && <AdminCertifications />}
          {activeTab === 'messages' && <AdminMessages />}
        </div>
      </main>
    </div>
  );
};
