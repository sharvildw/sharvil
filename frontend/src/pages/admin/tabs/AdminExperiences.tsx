import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Plus, Trash2, Edit, X } from 'lucide-react';

interface Experience {
  _id: string;
  type: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  score: string;
  isCurrent: boolean;
  order: number;
}

export const AdminExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState({
    type: 'experience',
    title: '',
    organization: '',
    period: '',
    description: '',
    score: '',
    isCurrent: false,
    order: 0
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/experiences`);
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    }
  };

  const handleOpenModal = (exp?: Experience) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        type: exp.type,
        title: exp.title,
        organization: exp.organization,
        period: exp.period,
        description: exp.description ? exp.description.join('\n') : '',
        score: exp.score || '',
        isCurrent: exp.isCurrent,
        order: exp.order
      });
    } else {
      setEditingExp(null);
      setFormData({ type: 'experience', title: '', organization: '', period: '', description: '', score: '', isCurrent: false, order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };
    const payload = { ...formData, description: formData.description.split('\n').filter(s => s.trim()) };

    try {
      if (editingExp) {
        await axios.put(`${API_BASE}/api/experiences/${editingExp._id}`, payload, { headers });
      } else {
        await axios.post(`${API_BASE}/api/experiences`, payload, { headers });
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (error) {
      console.error('Failed to save experience', error);
      alert('Failed to save experience');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/api/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (error) {
      console.error('Failed to delete experience', error);
      alert('Failed to delete experience');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Experience & Education</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium">
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {experiences.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/50 border-dashed">
            No entries found.
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp._id} className="bg-card/40 border border-border/50 rounded-xl overflow-hidden flex flex-col p-5 relative">
              <span className="absolute top-4 right-4 text-xs font-bold uppercase px-2 py-1 bg-secondary rounded-full">{exp.type}</span>
              <h3 className="font-bold text-lg mb-1">{exp.title}</h3>
              <p className="text-primary font-medium mb-2">{exp.organization}</p>
              <div className="text-sm text-muted-foreground mb-4">
                {exp.period} {exp.isCurrent && '(Current)'} | Order: {exp.order}
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-end gap-2 mt-auto">
                <button onClick={() => handleOpenModal(exp)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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
              <h2 className="text-2xl font-bold">{editingExp ? 'Edit Entry' : 'Add Entry'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2">
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization</label>
                  <input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Period</label>
                  <input required type="text" value={formData.period} onChange={e => setFormData({...formData, period: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Score (optional)</label>
                  <input type="text" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" placeholder="e.g. 8.86 SGPA" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" checked={formData.isCurrent} onChange={e => setFormData({...formData, isCurrent: e.target.checked})} id="isCurrent" />
                  <label htmlFor="isCurrent">Currently working/studying here</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (one bullet point per line)</label>
                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
