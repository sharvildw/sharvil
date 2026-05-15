import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Plus, Trash2, Edit, X } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

export const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    techStack: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/projects`);
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        techStack: project.techStack.join(', ')
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', description: '', image: '', githubUrl: '', liveUrl: '', techStack: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };
    const payload = { ...formData, techStack: formData.techStack.split(',').map(s => s.trim()) };

    try {
      if (editingProject) {
        await axios.put(`${API_BASE}/api/projects/${editingProject._id}`, payload, { headers });
      } else {
        await axios.post(`${API_BASE}/api/projects`, payload, { headers });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to save project', error);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project', error);
      alert('Failed to delete project');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/50 border-dashed">
            No projects found in the database.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-card/40 border border-border/50 rounded-xl overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden bg-secondary">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
              </div>
              <div className="p-4 border-t border-border/50 flex justify-end gap-2 bg-card/20">
                <button onClick={() => handleOpenModal(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL or Path</label>
                <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input type="text" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Live URL</label>
                  <input type="text" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                <input type="text" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" placeholder="React, Node, MongoDB" />
              </div>
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
