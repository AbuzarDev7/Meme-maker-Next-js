'use client';

import React, { useState, useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  lines: number;
  styles: string[];
  blank: string;
  example: string;
  source: string;
  _self: string;
}

export default function MemeMaker() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('buzz');
  const [topText, setTopText] = useState('Memes');
  const [bottomText, setBottomText] = useState('Memes Everywhere');

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      });
  }, []);

  const filteredTemplates = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20);

  const formatText = (text: string) => {
    return text.replace(/\s+/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s').replace(/\\/g, '~b') || '_';
  };

  const memeUrl = `https://api.memegen.link/images/${selectedId}/${formatText(topText)}/${formatText(bottomText)}.png`;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold outfit">
          Meme <span className="premium-gradient-text">Studio</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Create premium memes in seconds using professional templates and real-time preview.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Sidebar: Search & Select */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold opacity-70">Search Templates</label>
            <input
              type="text"
              placeholder="e.g. doge, buzz..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-800 rounded-2xl px-4 py-3 focus:ring-2 ring-brand-primary/50 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="col-span-2 py-12 text-center opacity-50 italic">Loading templates...</div>
            ) : (
              filteredTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedId === t.id ? 'border-brand-primary scale-95 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={t.blank} alt={t.name} className="object-cover w-full h-full" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2 opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-bold leading-tight truncate">{t.name}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Preview & Editor */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Card Preview */}
          <div className="flex-1 w-full p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div className="relative aspect-auto min-h-[300px] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
               <img src={memeUrl} alt="Preview" className="max-w-full max-h-full transition-opacity duration-300" key={memeUrl} />
            </div>
            <div className="mt-6 flex gap-4">
               <a href={memeUrl} download="meme.png" target="_blank" className="flex-1 btn-premium text-center">Open Image</a>
            </div>
          </div>

          {/* Form */}
          <div className="w-full md:w-80 space-y-6">
            <div className="space-y-4 p-6 rounded-3xl bg-white/30 dark:bg-slate-900/30 border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-bold outfit mb-4">Captions</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-50">Top Text</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-white/20 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-brand-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider opacity-50">Bottom Text</label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border border-white/20 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-sm">
                <p className="opacity-80">💡 <strong>Tip:</strong> Use underscores for spaces and ~q for question marks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
