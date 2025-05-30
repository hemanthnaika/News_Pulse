import { formatDistanceToNow } from 'date-fns';
import { newsImg } from "../assets";

const Card = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {articles.map((article, index) => (
        <a
          key={index}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition p-5 border border-gray-100 hover:border-sky-200"
        >
          <img
            src={article.urlToImage || newsImg}
            alt={article.title}
            className="h-48 w-full object-cover rounded-md mb-4"
          />

          <div className="flex justify-between">
            <h1 className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              {article.source?.name}
            </h1>
       <h1>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</h1>
          </div>

          <h3 className="text-base font-semibold text-sky-800 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {article.description || "No description available."}
          </p>
        </a>
      ))}
    </div>
  );
};

export default Card;
