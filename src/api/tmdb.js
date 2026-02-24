import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

const tmdbClient = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${TMDB_READ_TOKEN}`,
        Accept: 'application/json'
    }
});

// Interceptor to add api_key to params as fallback and handle logging
tmdbClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        api_key: TMDB_API_KEY
    };
    return config;
});

// Handle errors more gracefully
tmdbClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMsg = error.response?.data?.status_message || error.message;
        console.error("TMDB API Error:", errorMsg);

        // If it's a network error, maybe the user needs a proxy, but let's log it clearly
        if (error.message === "Network Error") {
            console.warn("Direct connection failed. This might be due to network restrictions or CORS.");
        }

        return Promise.reject(error);
    }
);

export const tmdb = {
    getTrending: async (mediaType = 'all', timeWindow = 'week') => {
        const response = await tmdbClient.get(`/trending/${mediaType}/${timeWindow}`);
        return response.data;
    },
    getTopRated: async (mediaType = 'movie') => {
        const response = await tmdbClient.get(`/${mediaType}/top_rated`);
        return response.data;
    },
    getPopular: async (mediaType = 'movie') => {
        const response = await tmdbClient.get(`/${mediaType}/popular`);
        return response.data;
    },
    getUpcoming: async () => {
        const response = await tmdbClient.get(`/movie/upcoming`);
        return response.data;
    },
    getDetails: async (mediaType, id) => {
        const response = await tmdbClient.get(`/${mediaType}/${id}`, {
            params: {
                append_to_response: 'videos,credits,similar',
            },
        });
        return response.data;
    },
    search: async (query) => {
        const response = await tmdbClient.get(`/search/multi`, {
            params: {
                query,
            },
        });
        return response.data;
    },
    getMoviesByGenre: async (genreId) => {
        const response = await tmdbClient.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
            },
        });
        return response.data;
    },
    getImageUrl: (path, size = 'original') => {
        if (!path) return '';
        return `https://image.tmdb.org/t/p/${size}${path}`;
    }
};

export const genres = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scienceFiction: 878,
    tvMovie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
};
