import React from 'react';
import { Twitter, User, Tag as TagIcon, Calendar } from 'lucide-react';

export default function PhotoGrid({ photos }) {
  if (!photos || photos.length === 0) return (
    <div className="text-center py-20 opacity-50 italic">No photos found for this filter.</div>
  );

  return (
    <div className="flex flex-col gap-10">
      {photos.map((photo, index) => (
        <div key={index} className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border dark:border-gray-700">
          
          {/* Image Side */}
          <div className="lg:w-2/3 relative group">
            <img 
              src={photo.media.m.replace('_m', '_b')} 
              alt={photo.title}
              className="w-full h-80 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
              <h3 className="text-xl font-bold">{photo.title || "Untitled"}</h3>
              <div className="flex items-center gap-4 mt-2 text-xs opacity-90">
                 <span className="flex items-center gap-1"><User size={14}/> {photo.author.split('"')[1] || "User"}</span>
                 <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(photo.published).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Twitter Challenge Side */}
          <div className="lg:w-1/3 p-6 bg-blue-50/30 dark:bg-gray-900/50 flex flex-col justify-between border-l dark:border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-500 font-black text-xs tracking-widest uppercase">
                <Twitter size={18} fill="currentColor" />
                Associated Tweet
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700">
                <p className="text-sm dark:text-gray-300 italic">
                    "Just spotted this amazing shot in the #{photo.tags.split(' ')[0] || 'photography'} feed! The composition is incredible."
                </p>
                <span className="text-xs text-blue-500 font-bold block mt-3">@FlickrBot_v2</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <TagIcon size={14} />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Tags</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {photo.tags.split(' ').slice(0, 5).map((t, i) => (
                  <span key={i} className="text-[9px] bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}