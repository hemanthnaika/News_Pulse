import { useState, useEffect } from 'react';
import axios from 'axios';
import SkeletonCard from './SkeletonCard';
import Card from './card';

const categories = ['general', 'technology', 'business', 'health', 'sports'];

export default function CategoryNews() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: selectedCategory,
            language: 'en',
            pageSize: 6,
            apiKey: import.meta.env.VITE_NEWS_API_KEY, 
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching category news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [selectedCategory]);

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-sky-900 mb-6">Trending by Category</h2>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`capitalize px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards */}
        {loading ? (
          <SkeletonCard/>
        ) : (
          <Card articles={articles}/>
        )}
      </div>
    </section>
  );
}
