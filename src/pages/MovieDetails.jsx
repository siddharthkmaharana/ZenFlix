import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Play, Plus, ThumbsUp, Share2, Download, Star, ChevronLeft } from "lucide-react";
import { createPageUrl } from "@/lib/utils";
import MovieSection from "@/components/MovieSection";
import CastCard from "@/components/CastCard";
import { tmdb } from "@/api/tmdb";

export default function MovieDetails({ isDark }) {
    const [searchParams] = useSearchParams();
    const movieId = searchParams.get("id");
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            if (!movieId) {
                setError("No content ID provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const mediaType = searchParams.get("type") || 'movie';
                const data = await tmdb.getDetails(mediaType, movieId);

                // Transform API data to component format
                setMovie({
                    id: data.id,
                    title: data.title || data.name,
                    tagline: data.tagline,
                    description: data.overview,
                    backdrop: tmdb.getImageUrl(data.backdrop_path, 'original'),
                    poster: tmdb.getImageUrl(data.poster_path),
                    imdbRating: data.vote_average ? data.vote_average.toFixed(1) : 'N/A',
                    rottenTomatoes: Math.round(data.vote_average * 10),
                    year: (data.release_date || data.first_air_date || '').split('-')[0],
                    rating: data.adult ? 'R' : 'PG-13',
                    duration: data.runtime
                        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                        : data.number_of_seasons
                            ? `${data.number_of_seasons} Season${data.number_of_seasons > 1 ? 's' : ''}`
                            : 'N/A',
                    genres: data.genres ? data.genres.map(g => g.name) : [],
                    director: data.credits?.crew?.find(c => c.job === 'Director' || c.job === 'Executive Producer')?.name || 'N/A',
                    cast: data.credits?.cast?.slice(0, 10).map(a => ({
                        name: a.name,
                        role: a.character,
                        image: tmdb.getImageUrl(a.profile_path, 'w185')
                    })),
                    similar: data.similar?.results?.map(m => ({ ...m, media_type: mediaType })) || []
                });
                setError(null);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching details:", err);
                const msg = err.response?.data?.status_message || err.message || "Unknown error";
                setError(`Failed to load: ${msg}`);
                setLoading(false);
            }
        };

        fetchMovieData();
        window.scrollTo(0, 0);
    }, [movieId, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 text-center ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
                <h1 className="text-2xl font-bold mb-4">Error loading movie</h1>
                <p className="text-gray-500 mb-6 max-w-md">{error || "Movie details could not be found."}</p>
                <Link to={createPageUrl("/")} className="px-6 py-2 bg-red-600 text-white rounded-lg">Go Home</Link>
            </div>
        );
    }

    return (
        <div className={isDark ? "bg-black text-white" : "bg-gray-100 text-black"}>
            {/* Hero Banner */}
            <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={movie.backdrop}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-all duration-1000 opacity-100 scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30" />
                </div>

                {/* Back Button */}
                <Link
                    to={createPageUrl("/")}
                    className="absolute top-24 left-4 md:left-12 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                </Link>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="max-w-3xl opacity-100 translate-y-0 transition-all duration-1000">
                            {/* Tagline */}
                            <p className="text-red-500 font-medium mb-2">{movie.tagline}</p>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                                {movie.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm md:text-base">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-5 h-5 fill-yellow-500" />
                                    <span className="font-bold">{movie.imdbRating}</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-green-500 font-semibold">
                                    {movie.rottenTomatoes}% Match
                                </span>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-300">{movie.year}</span>
                                <span className="px-2 py-0.5 border border-gray-500 text-gray-400 text-xs rounded">
                                    {movie.rating}
                                </span>
                                <span className="text-gray-300">{movie.duration}</span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
                                    <span className="text-base md:text-lg">Play</span>
                                </button>
                                <button
                                    onClick={() => setInWatchlist(!inWatchlist)}
                                    className={`flex items-center gap-2 px-6 py-3 md:py-4 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${inWatchlist
                                        ? "bg-red-600 text-white"
                                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                        }`}
                                >
                                    <Plus className={`w-5 h-5 ${inWatchlist ? "rotate-45" : ""} transition-transform`} />
                                    <span>{inWatchlist ? "In Watchlist" : "Watchlist"}</span>
                                </button>
                                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <ThumbsUp className="w-5 h-5 text-white" />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Share2 className="w-5 h-5 text-white" />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Download className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="max-w-[1800px] mx-auto px-4 md:px-12 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Synopsis
                        </h2>
                        <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {movie.description}
                        </p>
                    </div>

                    {/* Info */}
                    <div className={`p-6 rounded-2xl ${isDark ? "bg-white/5" : "bg-white"} backdrop-blur-sm`}>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-gray-500 text-sm mb-1">Director</h4>
                                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {movie.director}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-sm mb-1">Release Year</h4>
                                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {movie.year}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-sm mb-1">Duration</h4>
                                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {movie.duration}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-gray-500 text-sm mb-1">Rating</h4>
                                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {movie.rating}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                {movie.cast && movie.cast.length > 0 && (
                    <div className="mt-16">
                        <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Cast & Crew
                        </h2>
                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                            {movie.cast.map((actor) => (
                                <CastCard key={actor.name} actor={actor} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Similar Movies */}
            {movie.similar && movie.similar.length > 0 && (
                <MovieSection title="More Like This" movies={movie.similar} />
            )}
        </div>
    );
}

