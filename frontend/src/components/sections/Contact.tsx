import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import API_BASE from '../../lib/api';

type ToastType = 'success' | 'error' | null;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; msg: string } | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const showToast = (type: ToastType, msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE}/api/messages`, formData);
      showToast('success', "Message sent! I'll get back to you within 24–48 hours.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      showToast('error', 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 relative bg-background overflow-hidden">
        <div className="absolute top-0 right-1/4 -z-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 -z-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact Me</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Send me a message and I'll respond to your email directly — submissions also trigger an instant auto-reply.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Contact info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-4">Let's talk about your next project</h3>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                Fill in the form and you'll receive an <strong className="text-foreground">automatic email confirmation</strong> instantly — and I'll follow up personally.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { Icon: Mail, label: 'Email', value: 'sharvilwaghmare113@gmail.com', href: 'mailto:sharvilwaghmare113@gmail.com' },
                  { Icon: Phone, label: 'Phone', value: '+91 8767649906', href: 'tel:+918767649906' },
                  { Icon: MapPin, label: 'Location', value: 'Talegaon, Pune', href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div className="p-4 bg-secondary border border-border/50 rounded-2xl group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                      <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-0.5">{label}</h4>
                      {href ? (
                        <a href={href} className="text-muted-foreground text-sm hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>


            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="bg-card/40 backdrop-blur-xl border border-border/50 p-8 rounded-[2rem] shadow-xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text" id="name" required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sharvil Waghmare"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email" id="email" required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text" id="subject" required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message" rows={5} required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or idea..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none placeholder:text-muted-foreground/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl px-6 py-4 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  You'll receive an automatic reply confirming receipt 📬
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[200] max-w-sm w-full"
          >
            <div className={`flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
              {toast.type === 'success'
                ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
              <div className="flex-1">
                <p className="font-semibold text-sm mb-0.5">
                  {toast.type === 'success' ? 'Message Sent!' : 'Error'}
                </p>
                <p className="text-xs opacity-80 text-foreground">{toast.msg}</p>
              </div>
              <button onClick={() => setToast(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
