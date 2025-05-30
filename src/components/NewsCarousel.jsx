// src/components/NewsCarousel.jsx
import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import axios from 'axios';
import { newsImg } from '../assets'; // make sure this is a valid fallback image

export default function NewsCarousel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Skeleton loading state

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    const fetchCarouselNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            language: 'en',
            pageSize: 10,
        
            apiKey: import.meta.env.VITE_NEWS_API_KEY, 
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching carousel news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselNews();
  }, []);

  const skeletonArray = Array.from({ length: 4 }); // Number of skeletons shown while loading

  return (
    <section className="py-5 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">📰 Featured News</h2>

       <div ref={sliderRef} className="keen-slider">
  {loading
    ? skeletonArray.map((_, i) => (
        <div
          key={i}
          className="keen-slider__slide bg-sky-50 rounded-xl shadow p-4 animate-pulse"
        >
          <div className="h-40 w-full bg-gray-300 rounded-md mb-3" />
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="mt-2 h-4 bg-gray-300 rounded w-24" />
        </div>
      ))
    : articles.map((article, index) => (
        <div
          key={index}
          className="keen-slider__slide bg-sky-50 rounded-xl shadow p-4 mb-2 "
        >
          <img
            src={article.urlToImage || newsImg}
            alt={article.title}
            className="h-40 w-full object-cover rounded-md mb-3"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {article.description || 'No description available.'}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sky-700 font-medium hover:underline"
          >
            Read more →
          </a>
        </div>
      ))}
</div>
      </div>
    </section>
  );
}
