import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Plus, ThumbsUp, Share2, Download, Star, ChevronLeft } from "lucide-react";
import { createPageUrl } from "@/utils";
import MovieSection from "@/components/ui/MovieSection";
import CastCard from "@/components/ui/CastCard";
import { movieDetails, movies } from "@/components/data/movieData";

export default function MovieDetails({ isDark }) {
    const [loaded, setLoaded] = useState(false);
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const movie = movieDetails;

    return (
        <div className={isDark ? "" : "bg-gray-100"}>
            {/* Hero Banner */}
            <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={movie.backdrop}
                        alt={movie.title}
                        className={`w-full h-full object-cover transition-all duration-1000 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30" />
                </div>

                {/* Back Button */}
                <Link
                    to={createPageUrl("Home")}
                    className="absolute top-24 left-4 md:left-12 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                </Link>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12">
                    <div className="max-w-[1800px] mx-auto">
                        <div
                            className={`max-w-3xl transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                        >
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
                                    {movie.rottenTomatoes}% Fresh
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
                                {movie.genres.map((genre, i) => (
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
            </div>

            {/* Similar Movies */}
            <MovieSection title="More Like This" movies={movies.trending} />
            <MovieSection title="You May Also Like" movies={movies.scifi} />
        </div>
    );
}
