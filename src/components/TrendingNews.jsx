// src/components/TrendingNews.jsx
import { useEffect, useState } from "react";

import { fetchNews } from "../api/newsApi";
import SkeletonCard from "./SkeletonCard";
import Card from "./card";
export default function TrendingNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const articles = await fetchNews({
          q: "news",
          language: "en",
          pageSize: 10,
        });
        setArticles(articles);
      } catch (error) {
        console.error("Error fetching trending news:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          🔥 Trending News
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
