'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export default function Home() {
  const [memes, setMemes] = useState<MemeTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setMemes(response.data.memes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching memes:', err);
        setLoading(false);
      });
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-12">
      {/* Hero Section */}
      <header className="text-center space-y-4 py-8 animate-in fade-in duration-700">
        <h1 className="text-4xl md:text-5xl font-bold outfit tracking-tight">
          Meme <span className="text-brand-primary">Master</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-base">
          Create viral memes instantly. Search from templates and make your own.
        </p>
        
        <div className="max-w-md mx-auto relative group">
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 outline-none focus:border-brand-primary transition-all text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
            🔍
          </div>
        </div>
      </header>

      {/* Grid Section */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {filteredMemes.map((meme) => (
            <div 
              key={meme.id} 
              className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square w-full bg-slate-50 dark:bg-slate-800">
                <img 
                  src={meme.url} 
                  alt={meme.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold truncate opacity-80">{meme.name}</h3>
                  <p className="text-[10px] uppercase tracking-wider opacity-40">{meme.box_count} fields</p>
                </div>
                
                <Link 
                  href={`/make/${meme.id}?url=${encodeURIComponent(meme.url)}&name=${encodeURIComponent(meme.name)}&boxes=${meme.box_count}`}
                  className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-center text-[10px] font-bold hover:bg-brand-primary hover:text-white transition-colors"
                >
                  Make Meme
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMemes.length === 0 && !loading && (
        <div className="text-center py-24 opacity-50 italic">
          No memes found for "{search}". Try something else!
        </div>
      )}
    </div>
  );
}
