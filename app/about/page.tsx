import React from 'react';

const AboutPage = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-6xl font-extrabold tracking-tight outfit">
          Experience <span className="premium-gradient-text">Excellence</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto dark:text-slate-400">
          We are dedicated to crafting digital experiences that transcend the ordinary. Our passion for design and technology drives everything we do.
        </p>
      </section>

      {/* Content Grid */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold outfit">Our Vision</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            In an ever-evolving digital landscape, we believe in the power of simplicity and elegance. Our vision is to empower creators and businesses with tools that feel as good as they look.
          </p>
          <div className="flex gap-4">
             <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/20 backdrop-blur-sm">
                <span className="block text-2xl font-bold premium-gradient-text">100+</span>
                <span className="text-sm text-slate-500">Projects</span>
             </div>
             <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/20 backdrop-blur-sm">
                <span className="block text-2xl font-bold premium-gradient-text">50k+</span>
                <span className="text-sm text-slate-500">Users</span>
             </div>
          </div>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center border border-white/10">
           {/* Abstract visual element */}
           <div className="w-1/2 h-1/2 rounded-full bg-brand-primary blur-[100px] opacity-20 animate-pulse"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-brand-secondary/30 rounded-full animate-ping"></div>
           </div>
           <div className="z-10 text-center p-8">
              <p className="text-4xl">🚀</p>
           </div>
        </div>
      </section>

      {/* Values */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Design", icon: "🎨", desc: "Pixel-perfect precision in every element." },
          { title: "Innovation", icon: "⚡", desc: "Pushing boundaries with cutting-edge tech." },
          { title: "Quality", icon: "💎", desc: "Uncompromising standards in every line of code." }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/30 dark:bg-slate-900/30 border border-white/10 backdrop-blur-md hover:border-brand-primary/40 transition-all duration-300 group">
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
            <h3 className="text-xl font-bold mb-2 outfit">{item.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
