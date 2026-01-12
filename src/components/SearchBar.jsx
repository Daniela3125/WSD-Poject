import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Previne refresh-ul paginii
      if (value.trim()) {
        onSearch(value.trim());
      }
    }
  };

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search photos (e.g. nature, animals)..."
        className="w-full pl-12 pr-4 py-4 bg-white text-black font-semibold text-lg rounded-2xl border-none ring-2 ring-gray-100 dark:ring-gray-800 focus:ring-blue-500 shadow-sm outline-none transition-all"
      />
    </div>
  );
}