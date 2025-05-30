// src/components/HeroNews.jsx
import { useEffect, useState } from "react";
import { fetchNews } from "../api/newsApi";
import { formatDistanceToNow } from "date-fns";

export default function HeroNews() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHeadline = async () => {
      try {
        const articles = await fetchNews({
          endpoint: "everything",
          q: "news",
          sortBy: "publishedAt",
          language: "en",
          pageSize: 1,
        });

        if (articles.length > 0) {
          setArticle(articles[0]);
        } else {
          setError("No articles found.");
        }
      } catch {
        setError("Unable to load news at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeadline();
  }, []);

  if (error) {
    return (
      <section className="py-20 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-pulse">
          <div className="bg-gray-200 h-64 w-full rounded-xl"></div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
            <div className="h-10 bg-gray-300 rounded w-40 mt-6"></div>
          </div>
        </div>
      </section>
    );
  }

  const { urlToImage, title, description, source, publishedAt, url } = article;

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Column */}
        <div>
          {urlToImage ? (
            <img
              src={urlToImage}
              alt={title}
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-64 w-full rounded-lg flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              {source?.name}
            </span>
            <span>
              {formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-gray-700 text-base line-clamp-3">
            {description || "No description available."}
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </section>
  );
}
