// src/pages/SearchPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchNews } from '../api/newsApi';
import Card from '../components/Card';
import SkeletonCard from '../components/SkeletonCard';

export default function SearchPage() {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const articles= await fetchNews({
            q: query,
            sortBy: 'publishedAt',
            language: 'en',
           
            pageSize: 12,
        });
        setArticles(articles);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Search Results for: “{query}”</h1>
      {loading ? (
       <SkeletonCard />
      ) : articles.length > 0 ? (
      <Card articles={articles} />
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </section>
  );
}
