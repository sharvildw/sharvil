import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Plus, Trash2, Edit, X } from 'lucide-react';

interface Skill {
  _id: string;
  category: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];
  order: number;
}

export const AdminSkills = () => {
  const [categories, setCategories] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Skill | null>(null);

  const [formData, setFormData] = useState({
    category: '',
    icon: 'Code2',
    color: 'from-blue-500 to-cyan-400',
    skills: [] as { name: string; level: number }[],
    order: 0
  });

  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/skills`);
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch skills', error);
    }
  };

  const handleOpenModal = (category?: Skill) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        category: category.category,
        icon: category.icon,
        color: category.color,
        skills: category.skills,
        order: category.order
      });
    } else {
      setEditingCategory(null);
      setFormData({ category: '', icon: 'Code2', color: 'from-blue-500 to-cyan-400', skills: [], order: 0 });
    }
    setNewSkill({ name: '', level: 50 });
    setIsModalOpen(true);
  };

  const handleAddSkill = () => {
    if (!newSkill.name) return;
    setFormData({ ...formData, skills: [...formData.skills, newSkill] });
    setNewSkill({ name: '', level: 50 });
  };

  const handleRemoveSkill = (index: number) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData({ ...formData, skills: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingCategory) {
        await axios.put(`${API_BASE}/api/skills/${editingCategory._id}`, formData, { headers });
      } else {
        await axios.post(`${API_BASE}/api/skills`, formData, { headers });
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      console.error('Failed to save skill category', error);
      alert('Failed to save skill category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill category', error);
      alert('Failed to delete skill category');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Skills</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/50 border-dashed">
            No skill categories found.
          </div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="bg-card/40 border border-border/50 rounded-xl overflow-hidden flex flex-col p-5">
              <h3 className="font-bold text-lg mb-2">{category.category}</h3>
              <p className="text-sm text-muted-foreground mb-4">Icon: {category.icon} | Order: {category.order}</p>
              <div className="space-y-2 mb-4 flex-grow">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-end gap-2 mt-auto">
                <button onClick={() => handleOpenModal(category)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(category._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
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
              <h2 className="text-2xl font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon (Lucide name)</label>
                  <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color Classes (Gradient)</label>
                  <input type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <h3 className="font-semibold mb-2">Skills in this Category</h3>
                {formData.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-4 mb-2">
                    <div className="flex-grow bg-background border border-border rounded-lg px-4 py-2 text-sm">{skill.name} - {skill.level}%</div>
                    <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-red-400 hover:text-red-500"><X className="w-5 h-5"/></button>
                  </div>
                ))}
                
                <div className="flex gap-4 mt-4">
                  <input type="text" placeholder="Skill name" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="flex-grow bg-background border border-border rounded-lg px-4 py-2" />
                  <input type="number" placeholder="Level (%)" value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: parseInt(e.target.value)})} className="w-24 bg-background border border-border rounded-lg px-4 py-2" />
                  <button type="button" onClick={handleAddSkill} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg">Add</button>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
