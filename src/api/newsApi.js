// src/api/newsApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async ({
  endpoint = 'everything',
  q = '',
  sortBy = 'publishedAt',
  pageSize = 5,
  language = 'en',
  country = '',
}) => {
  try {
    const params = {
      apiKey: API_KEY,
      q,
      sortBy,
      pageSize,
      language,
    };

    // Only use 'country' for top-headlines
    if (endpoint === 'top-headlines' && country) {
      params.country = country;
    }

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params,
    });

    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
