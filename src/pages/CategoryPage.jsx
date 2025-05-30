// src/pages/CategoryPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchNews } from '../api/newsApi';
import Card from '../components/Card';
import SkeletonCard from './../components/SkeletonCard';

export default function CategoryPage() {
  const { name } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const articles= await fetchNews( {
            q: name,
            sortBy: 'publishedAt',
            language: 'en',
            pageSize: 12,
         
        });
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching category news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [name]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {name} News
      </h1>

      {loading ? (
       <SkeletonCard/>
      ) : articles.length > 0 ? (
      <Card articles={articles}/>
      ) : (
        <p>No articles found for {name}.</p>
      )}
    </section>
  );
}
