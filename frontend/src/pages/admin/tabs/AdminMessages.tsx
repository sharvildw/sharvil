import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../../lib/api';
import { Trash2, Mail, MailOpen } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get(`${API_BASE}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    if (currentStatus) return; // already read
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_BASE}/api/messages/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      console.error('Failed to update message status', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_BASE}/api/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      console.error('Failed to delete message', error);
      alert('Failed to delete message');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Contact Messages</h2>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/50 border-dashed">
            No messages yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`bg-card/40 border ${msg.isRead ? 'border-border/50' : 'border-primary/50'} rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center transition-colors`}>
              <div className="flex-shrink-0">
                {msg.isRead ? <MailOpen className="w-8 h-8 text-muted-foreground" /> : <Mail className="w-8 h-8 text-primary" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg">{msg.subject}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">From: {msg.name} ({msg.email})</p>
                <div className="bg-background rounded-lg p-3 text-sm text-muted-foreground">
                  {msg.message}
                </div>
              </div>
              <div className="flex-shrink-0 flex gap-2 w-full md:w-auto justify-end mt-4 md:mt-0">
                {!msg.isRead && (
                  <button onClick={() => handleMarkAsRead(msg._id, msg.isRead)} className="px-3 py-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg text-sm font-medium transition-colors">
                    Mark Read
                  </button>
                )}
                <button onClick={() => handleDelete(msg._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
