import { useEffect, useState } from 'react';
import { fetchNews } from '../api/newsApi';

import SkeletonCard from './SkeletonCard';
import Card from './card';


export default function LatestNews() {
  const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const articles =await fetchNews({
            q: 'news',
            pageSize: 10,
        });
        setArticles(articles.slice(1));
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);
  return (
    <section className="bg-sky-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-sky-900 mb-8">
          Latest News
        </h2>
         {loading ? (
          <SkeletonCard/>
        ) : (
          <Card articles={articles}/>
          
        )}
      </div>
    </section>
  );
}