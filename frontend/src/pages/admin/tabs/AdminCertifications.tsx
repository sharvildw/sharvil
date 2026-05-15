import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Plus, Trash2, Edit, X } from 'lucide-react';

interface Certification {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  order: number;
}

export const AdminCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    link: '',
    order: 0
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/certifications`);
      setCertifications(data);
    } catch (error) {
      console.error('Failed to fetch certifications', error);
    }
  };

  const handleOpenModal = (cert?: Certification) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        link: cert.link || '',
        order: cert.order
      });
    } else {
      setEditingCert(null);
      setFormData({ title: '', issuer: '', date: '', link: '', order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      if (editingCert) {
        await axios.put(`${API_BASE}/api/certifications/${editingCert._id}`, formData, { headers });
      } else {
        await axios.post(`${API_BASE}/api/certifications`, formData, { headers });
      }
      setIsModalOpen(false);
      fetchCertifications();
    } catch (error) {
      console.error('Failed to save certification', error);
      alert('Failed to save certification');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/api/certifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCertifications();
    } catch (error) {
      console.error('Failed to delete certification', error);
      alert('Failed to delete certification');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Certifications</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors font-medium">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/50 border-dashed">
            No certifications found.
          </div>
        ) : (
          certifications.map((cert) => (
            <div key={cert._id} className="bg-card/40 border border-border/50 rounded-xl overflow-hidden flex flex-col p-5">
              <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
              <p className="text-primary font-medium mb-2">{cert.issuer}</p>
              <div className="text-sm text-muted-foreground mb-4">
                {cert.date} | Order: {cert.order}
              </div>
              <div className="pt-4 border-t border-border/50 flex justify-end gap-2 mt-auto">
                <button onClick={() => handleOpenModal(cert)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border p-8 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingCert ? 'Edit Certification' : 'Add Certification'}</h2>
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
                <label className="block text-sm font-medium mb-1">Issuer</label>
                <input required type="text" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link URL</label>
                <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              
              <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
