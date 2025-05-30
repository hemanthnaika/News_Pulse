// src/components/EditorsPicks.jsx
import { useEffect, useState } from 'react';
import { fetchNews } from '../api/newsApi';
import { newsImg } from '../assets'; // fallback image

export default function EditorsPicks() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const articles = await fetchNews({
          q: 'editor OR feature OR spotlight',
          language: 'en',
          sortBy: 'relevancy',
          pageSize: 12,
        });
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching editor’s picks:', error);
      }
    };

    fetchPicks();
  }, []);

  if (articles.length === 0) return null;

  const mainStories = articles.slice(0, 3);
  const secondaryStories = articles.slice(3);

  return (
    <section className="bg-gradient-to-br from-sky-50 to-white pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">🎯 Editor’s Picks</h2>

        {/* Top 3 main stories in a row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainStories.map((story, index) => (
            <a
              key={index}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  src={story.urlToImage || newsImg}
                  alt={story.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white drop-shadow mb-1">
                    {story.title}
                  </h3>
                  <p className="text-white text-sm line-clamp-2">
                    {story.description || 'No description available.'}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Smaller featured stories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryStories.map((story, index) => (
            <a
              key={index}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full"
            >
              <img
                src={story.urlToImage || newsImg}
                alt={story.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {story.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                  {story.description || 'No description available.'}
                </p>
                <span className="mt-3 text-blue-600 text-sm font-medium hover:underline">
                  Read more →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
