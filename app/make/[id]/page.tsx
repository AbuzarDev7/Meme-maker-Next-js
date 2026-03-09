'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function MemeEditorContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialUrl = searchParams.get('url');
  const initialName = searchParams.get('name');
  const boxCount = parseInt(searchParams.get('boxes') || '2');

  const [texts, setTexts] = useState<string[]>(Array(boxCount).fill(''));
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Default texts for common memes
  useEffect(() => {
    if (boxCount === 2) {
      setTexts(['TOP TEXT', 'BOTTOM TEXT']);
    }
  }, [boxCount]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('template_id', id);
    texts.forEach((text) => {
      formData.append('texts', text);
    });

    try {
      const response = await fetch('/api/caption', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedUrl(data.data.url);
      } else {
        alert('Error: ' + (data.error_message || 'Failed to generate meme. Please ensure your credentials are set in .env.local'));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate meme. Make sure your server is running and .env.local is configured.');
    } finally {
      setLoading(false);
    }
  };

  const currentDisplayUrl = generatedUrl || initialUrl;

  return (
    <div className="min-h-screen p-4 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold opacity-50 hover:opacity-100 transition-opacity"
        >
          ← Back to Gallery
        </button>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Preview Section */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
              <div className="aspect-auto min-h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden">
                {currentDisplayUrl ? (
                  <img 
                    src={currentDisplayUrl} 
                    alt="Meme Preview" 
                    className="max-w-full max-h-[500px] object-contain"
                  />
                ) : (
                  <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-brand-primary border-t-transparent animate-spin" />
                    <p className="text-xs font-bold opacity-20">LOADNG TEMPLATE...</p>
                  </div>
                )}
              </div>

              {loading && (
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-10">
                   <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-lg flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent animate-spin rounded-full" />
                      <span className="text-sm font-bold">Creating...</span>
                   </div>
                </div>
              )}
            </div>

            {generatedUrl && (
              <div className="flex gap-3 animate-in fade-in duration-300">
                <a 
                  href={generatedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-primary text-white text-center py-3 rounded-xl font-bold text-sm"
                >
                  Download
                </a>
                <button 
                  onClick={() => setGeneratedUrl(null)}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold outfit">{initialName}</h2>
              <p className="text-sm opacity-50">Enter text below to generate your meme.</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid gap-3">
                {texts.map((text, index) => (
                  <div key={index} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider font-bold opacity-40">
                      BOX {index + 1}
                    </label>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => {
                        const newTexts = [...texts];
                        newTexts[index] = e.target.value;
                        setTexts(newTexts);
                      }}
                      placeholder={`Text ${index + 1}`}
                      className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-brand-primary/20 transition-all text-sm"
                      required
                    />
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-xl bg-brand-primary text-white font-bold text-base shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Meme'}
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MakePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  if (!id) return null;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MemeEditorContent id={id} />
    </Suspense>
  );
}
