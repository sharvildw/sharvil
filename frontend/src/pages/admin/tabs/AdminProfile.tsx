import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Save } from 'lucide-react';

export const AdminProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    aboutText: '',
    aboutHighlight: '',
    heroTagline: '',
    resumeUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    profileImage: '',
    yearsExperience: '',
    projectsCount: '',
    availableFor: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/profile`);
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_BASE}/api/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-card/40 border border-border/50 rounded-xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary border-b border-border/50 pb-2">Basic Info</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="text" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary border-b border-border/50 pb-2">Links & Assets</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input type="text" value={formData.profileImage || ''} onChange={e => setFormData({...formData, profileImage: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Resume URL</label>
              <input type="text" value={formData.resumeUrl || ''} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input type="text" value={formData.githubUrl || ''} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input type="text" value={formData.linkedinUrl || ''} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Years Exp</label>
                <input type="text" value={formData.yearsExperience || ''} onChange={e => setFormData({...formData, yearsExperience: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Projects Count</label>
                <input type="text" value={formData.projectsCount || ''} onChange={e => setFormData({...formData, projectsCount: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-primary border-b border-border/50 pb-2">Content</h3>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Tagline</label>
            <textarea rows={2} value={formData.heroTagline || ''} onChange={e => setFormData({...formData, heroTagline: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About Text</label>
            <textarea rows={4} value={formData.aboutText || ''} onChange={e => setFormData({...formData, aboutText: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About Highlight Box</label>
            <textarea rows={2} value={formData.aboutHighlight || ''} onChange={e => setFormData({...formData, aboutHighlight: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Available For (Status)</label>
            <input type="text" value={formData.availableFor || ''} onChange={e => setFormData({...formData, availableFor: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all disabled:opacity-70">
            <Save className="w-5 h-5" /> {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
