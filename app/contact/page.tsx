import React from 'react';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold outfit">Get in <span className="premium-gradient-text">Touch</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">Have a question or want to work together? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact Info */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold outfit">Contact Info</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/10 backdrop-blur-sm">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold">hello@aesthetic.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/10 backdrop-blur-sm">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-sm text-slate-500">Office</p>
                  <p className="font-semibold">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/20">
            <h3 className="text-xl font-bold mb-2 outfit">Join our newsletter</h3>
            <p className="text-white/80 text-sm mb-4">Get the latest updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 ring-white/50 flex-1" />
              <button className="bg-white text-brand-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">Join</button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-white/20 backdrop-blur-xl space-y-6 shadow-2xl shadow-black/5">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Name</label>
                <input type="text" className="w-full bg-white dark:bg-slate-800 border border-white/20 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 ring-brand-primary/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold opacity-70">Email</label>
                <input type="email" className="w-full bg-white dark:bg-slate-800 border border-white/20 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 ring-brand-primary/50 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70">Subject</label>
              <input type="text" className="w-full bg-white dark:bg-slate-800 border border-white/20 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 ring-brand-primary/50 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70">Message</label>
              <textarea rows={4} className="w-full bg-white dark:bg-slate-800 border border-white/20 dark:border-slate-700 rounded-2xl px-4 py-3 focus:ring-2 ring-brand-primary/50 outline-none transition-all"></textarea>
            </div>
            <button type="button" className="w-full btn-premium py-4 text-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
