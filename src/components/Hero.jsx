import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { createPageUrl } from "@/lib/utils";
import { tmdb } from "@/api/tmdb";

export default function Hero() {
    const [movie, setMovie] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [muted, setMuted] = useState(true);

    const [error, setError] = useState(null);

    const fetchHeroMovie = async () => {
        try {
            setError(null);
            // Try Trending first
            let results = [];
            try {
                const trending = await tmdb.getTrending('all', 'week');
                results = trending.results;
            } catch (e) {
                console.warn("Hero: Trending fetch failed, trying Popular...", e);
                // Fallback to Popular
                const popular = await tmdb.getPopular('movie');
                results = popular.results;
            }

            if (results && results.length > 0) {
                // Filter out entries without images to ensure visual quality
                const validMovies = results.filter(m => m.backdrop_path && m.title);

                if (validMovies.length > 0) {
                    const randomIndex = Math.floor(Math.random() * validMovies.length);
                    const selectedMovie = validMovies[randomIndex];

                    // Fetch full details to get more info like tagline or runtime if needed
                    // But for now, using the basic info is safer to avoid extra API calls failing

                    setMovie({
                        id: selectedMovie.id,
                        title: selectedMovie.title || selectedMovie.name || selectedMovie.original_name,
                        description: selectedMovie.overview,
                        backdrop: tmdb.getImageUrl(selectedMovie.backdrop_path, 'original'),
                        poster: tmdb.getImageUrl(selectedMovie.poster_path),
                        match: Math.round(selectedMovie.vote_average * 10),
                        year: (selectedMovie.release_date || selectedMovie.first_air_date || '').split('-')[0],
                        rating: selectedMovie.adult ? 'R' : 'PG-13',
                        duration: '2h 15m', // Placeholder as list endpoint doesn't return runtime
                        genres: ['Trending', 'Popular'], // Placeholder
                        vote_average: selectedMovie.vote_average
                    });
                } else {
                    throw new Error("No movies with valid images found");
                }
            } else {
                throw new Error("No movies found");
            }
        } catch (error) {
            console.error("Hero fetch fetch error:", error);
            const msg = error.response?.data?.status_message || error.message || "Unknown error";
            setError(`Failed to load: ${msg}`);
        }
    };

    useEffect(() => {
        fetchHeroMovie();
    }, []);

    useEffect(() => {
        if (movie) {
            const timer = setTimeout(() => setLoaded(true), 100);
            return () => clearTimeout(timer);
        }
    }, [movie]);

    if (error) return (
        <div className="relative h-[50vh] md:h-[70vh] w-full bg-black/95 flex flex-col items-center justify-center p-8 text-center z-50">
            <div className="text-red-500 text-3xl font-bold mb-4">Featured Content Unavailable</div>
            <div className="text-white text-lg max-w-lg mb-6">
                We couldn't load the featured movie.
                <p className="text-sm text-gray-400 mt-2">{error}</p>
            </div>
            <button
                onClick={fetchHeroMovie}
                className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
            >
                Retry
            </button>
        </div>
    );

    if (!movie) return (
        <div className="relative h-[85vh] md:h-[90vh] w-full bg-black/95 animate-pulse flex items-center justify-center">
            <div className="text-white/20 text-xl font-light tracking-widest">LOADING EXPERIENCE...</div>
        </div>
    );

    return (
        <div className="relative h-[85vh] md:h-[90vh] overflow-hidden group">
            {/* Background Image */}
            <div className="absolute inset-0 select-none pointer-events-none">
                <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out will-change-transform ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                />

                {/* Multiple Gradient Overlays for Cinematic Depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full w-full max-w-[1800px] mx-auto px-4 md:px-12 flex items-center z-10">
                <div
                    className={`max-w-2xl transition-all duration-1000 delay-300 ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    {/* Logo/Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.1] tracking-tight drop-shadow-2xl">
                        {movie.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-6 text-sm md:text-base font-medium">
                        <span className="text-green-400 font-bold tracking-wide">{movie.match}% Match</span>
                        <span className="text-gray-300">{movie.year}</span>
                        <span className="px-2 py-0.5 border border-gray-500/70 text-gray-300 text-xs rounded bg-black/20 backdrop-blur-sm">
                            {movie.rating}
                        </span>
                        <span className="text-gray-300">{movie.duration}</span>
                        <span className="px-2 py-0.5 border border-gray-500/70 text-gray-300 text-xs rounded bg-black/20 backdrop-blur-sm">
                            HD
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 md:line-clamp-4 drop-shadow-md text-shadow-sm max-w-xl">
                        {movie.description}
                    </p>

                    {/* Genres */}
                    <div className="flex items-center gap-3 mb-8 text-sm font-medium text-gray-300">
                        {movie.genres?.map((genre, i) => (
                            <React.Fragment key={genre}>
                                <span className="hover:text-white transition-colors cursor-pointer">{genre}</span>
                                {i < movie.genres.length - 1 && (
                                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <Link
                            to={createPageUrl(`MovieDetails?id=${movie.id}`)}
                            className="flex items-center gap-3 px-8 py-3.5 bg-white text-black font-bold rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl active:scale-95"
                        >
                            <Play className="w-6 h-6 fill-black" />
                            <span className="text-lg">Play</span>
                        </Link>
                        <Link
                            to={createPageUrl(`MovieDetails?id=${movie.id}`)}
                            className="flex items-center gap-3 px-8 py-3.5 bg-gray-500/40 backdrop-blur-md text-white font-bold rounded-md hover:bg-gray-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/10"
                        >
                            <Info className="w-6 h-6" />
                            <span className="text-lg">More Info</span>
                        </Link>
                    </div>
                </div>

                {/* Sound Toggle */}
                <div className="absolute right-4 md:right-12 bottom-32 md:bottom-40 flex flex-col items-center gap-4">
                    <button
                        onClick={() => setMuted(!muted)}
                        className="w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/10 hover:border-white/60 transition-all active:scale-90 group/mute"
                    >
                        {muted ? (
                            <VolumeX className="w-5 h-5 text-white group-hover/mute:scale-110 transition-transform" />
                        ) : (
                            <Volume2 className="w-5 h-5 text-white group-hover/mute:scale-110 transition-transform" />
                        )}
                    </button>
                    <div className="w-[1px] h-12 bg-white/20"></div>
                    <div className="px-3 py-1 bg-gray-800/60 backdrop-blur-md border-l-2 border-white text-white text-sm font-medium tracking-wide">
                        16+
                    </div>
                </div>

            </div>
        </div>
    );
}
