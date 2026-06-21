import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Mock service to log to console
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network request
      console.log('--- FORM SUBMISSION LOG ---');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Phone:', formData.phone || 'N/A');
      console.log('Subject:', formData.subject);
      console.log('Message:', formData.message);
      console.log('---------------------------');
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#1b3281] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1b3281]/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">Reach out to the St. Mary's College Old Boys Association for any inquiries, partnerships, or support.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Get in Touch</h2>
            <p className="text-slate-600">We are always happy to hear from our alumni and well-wishers. Choose your preferred method of communication below.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Address</h3>
                  <p className="text-slate-600 mt-1">St. Mary's College<br />Hambantota,<br />Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email</h3>
                  <p className="text-slate-600 mt-1">info@smcoba.org<br />support@smcoba.org</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Phone</h3>
                  <p className="text-slate-600 mt-1">+94 47 222 2222<br />+94 77 123 4567</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex flex-col gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100057457787744"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-3xl border border-slate-200 bg-slate-50 hover:border-[#1b3281] hover:bg-[#1b3281]/5 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Facebook Updates</p>
                    <p className="text-slate-600 text-sm">Latest news available on our Facebook page</p>
                  </div>
                </a>
                <div className="grid grid-cols-3 gap-3">
                  <a href="#" className="w-full h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#1b3281] hover:text-white transition-colors">fb</a>
                  <a href="#" className="w-full h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#1b3281] hover:text-white transition-colors">in</a>
                  <a href="#" className="w-full h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:bg-[#1b3281] hover:text-white transition-colors">x</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-[#1b3281]" />
                <h2 className="text-2xl font-bold text-slate-900 font-serif">Send an Inquiry</h2>
              </div>

              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Message Sent Successfully</h3>
                  <p className="text-emerald-600 mb-6">Thank you for reaching out. A committee member will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-400'} focus:outline-none focus:ring-4 transition-all`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-400'} focus:outline-none focus:ring-4 transition-all`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-400 transition-all"
                        placeholder="+94 77 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">Subject *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white ${errors.subject ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-400'} focus:outline-none focus:ring-4 transition-all`}
                      >
                        <option value="">Select a topic</option>
                        <option value="membership">Membership Inquiry</option>
                        <option value="events">Events & Activities</option>
                        <option value="donation">Donations & Sponsorships</option>
                        <option value="general">General Support</option>
                      </select>
                      {errors.subject && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-amber-200 focus:border-amber-400'} focus:outline-none focus:ring-4 transition-all resize-none`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {errors.message && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 bg-[#1b3281] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#2542a1] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
