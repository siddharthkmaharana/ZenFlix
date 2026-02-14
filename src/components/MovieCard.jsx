import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { createPageUrl } from "@/lib/utils";
import { tmdb } from "@/api/tmdb";

export default function MovieCard({ movie, index = 0 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Derive properties from TMDB data
    const posterUrl = tmdb.getImageUrl(movie.poster_path, 'w500');
    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, 'w780');
    const title = movie.title || movie.name;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
    const isGlobalTrending = movie.vote_count > 1000 && movie.vote_average > 7.5; // Heuristic for "NEW" or "Trending"

    return (
        <div
            className="relative group flex-shrink-0 w-[160px] md:w-[200px] lg:w-[240px] z-10 hover:z-50"
            style={{ animationDelay: `${index * 50}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={createPageUrl(`MovieDetails?id=${movie.id}`)}>
                <div
                    className={`relative aspect-[2/3] rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? "scale-110 shadow-2xl shadow-black/80 ring-2 ring-white/20" : "scale-100"
                        }`}
                >
                    {/* Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                    )}

                    {/* Image */}
                    <img
                        src={posterUrl}
                        alt={title}
                        onLoad={() => setImageLoaded(true)}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    {/* Gradient Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />

                    {/* Play Button Overlay */}
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
                            }`}
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center transform hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-black fill-black ml-1" />
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 transition-all duration-300 transform ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        <h3 className="text-xs md:text-sm font-bold text-white truncate mb-3 drop-shadow-md">
                            {title}
                        </h3>

                        <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-2">
                                <button title="Play" className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-md">
                                    <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                                </button>
                                <button title="Add to List" className="w-8 h-8 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center hover:bg-white/20 hover:border-white transition-colors backdrop-blur-md">
                                    <Plus className="w-4 h-4 text-white" />
                                </button>
                                <button title="Like" className="w-8 h-8 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center hover:bg-white/20 hover:border-white transition-colors backdrop-blur-md hidden sm:flex">
                                    <ThumbsUp className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>

                            <button className="w-8 h-8 rounded-full bg-black/40 border-2 border-white/50 flex items-center justify-center hover:bg-white/20 hover:border-white transition-colors backdrop-blur-md ml-auto">
                                <ChevronDown className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mt-3 text-[10px] sm:text-xs font-medium text-gray-300">
                            <span className="text-green-400 font-bold">98% Match</span>
                            <span className="border border-white/40 px-1 rounded text-[9px]">HD</span>
                        </div>
                    </div>

                    {/* Top Badge */}
                    {isGlobalTrending && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold rounded shadow-lg uppercase tracking-wider">
                            New
                        </div>
                    )}

                    {rating && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-lg">
                            <span className="text-yellow-400">★</span> {rating}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}
