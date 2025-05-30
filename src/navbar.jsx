// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const navItems = [ "World", "Politics", "Business", "Tech", "Health"];

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50 font-roboto font-bold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-blue-600">
            News<span className="text-black">Pulse</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition font-medium ">Home</a>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/category/${item.toLowerCase()}`)}
                className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search + Menu */}
          <div className="flex items-center space-x-3">
            {/* Search input (hidden on mobile) */}
            <div className="hidden md:flex w-64">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              {item}
            </a>
          ))}
          <div className="mt-3 flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
