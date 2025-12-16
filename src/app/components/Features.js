import React from 'react';

export default function Features() {
  const features = [
    {
      title: "Smart Summaries",
      description: "Paste your raw notes and let AI condense them into concise, bulleted summaries instantly.",
      icon: "📝", // You can replace these with <img> tags later
    },
    {
      title: "Quiz Generation",
      description: "Test your knowledge. NoteSynth automatically creates multiple-choice questions from your content.",
      icon: "🧠",
    },
    {
      title: "Instant Flashcards",
      description: "Turn complex topics into easy-to-review flashcards for efficient spaced repetition learning.",
      icon: "⚡",
    }
  ];

  return (
    <section className="w-full pb-12 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supercharge Your <span className="text-amber-500">Learning</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stop wasting time formatting notes. Let our AI handle the organization so you can focus on understanding.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-amber-500/50 hover:bg-gray-900 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 bg-gray-800 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}