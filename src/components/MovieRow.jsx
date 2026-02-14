import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function MovieRow({ title, fetchFn, showRank = false }) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await fetchFn();
                setMovies(request.results || []);
            } catch (error) {
                console.error("Failed to fetch row data:", error);
            }
        }
        fetchData();
    }, [fetchFn]);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        const container = scrollRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 10
            );
        }
    };

    // Initial check for arrows
    useEffect(() => {
        handleScroll();
    }, [movies]);

    if (!movies.length) return null;

    return (
        <section className="relative py-4 md:py-8 group/section z-10 hover:z-20 transition-all duration-300">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4 px-4 md:px-12 flex items-center gap-2 group cursor-pointer hover:text-green-400 transition-colors">
                {title}
                <span className="text-sm font-semibold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300 flex items-center">
                    Explore All <ChevronRight className="w-4 h-4" />
                </span>
            </h2>

            <div className="relative group/slider">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-0 bottom-0 z-50 w-12 md:w-16 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center justify-center transition-all duration-300 ${showLeftArrow ? "opacity-0 group-hover/slider:opacity-100 translate-x-0" : "opacity-0 pointer-events-none -translate-x-full"
                        }`}
                >
                    <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg transform hover:scale-125 transition-transform" />
                </button>

                {/* Movies Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-8 pt-4 scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {movies.map((movie, index) => (
                        <div key={movie.id} className="relative flex-none">
                            {showRank && (
                                <span className="absolute -left-6 bottom-4 text-[100px] md:text-[140px] font-black text-black text-stroke-2 text-stroke-white/50 leading-none z-0 select-none drop-shadow-lg">
                                    {index + 1}
                                </span>
                            )}
                            <div className={showRank ? "ml-8" : ""}>
                                <MovieCard movie={movie} index={index} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-0 bottom-0 z-50 w-12 md:w-16 bg-gradient-to-l from-black/80 via-black/40 to-transparent flex items-center justify-center transition-all duration-300 ${showRightArrow ? "opacity-0 group-hover/slider:opacity-100 translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
                        }`}
                >
                    <ChevronRight className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-lg transform hover:scale-125 transition-transform" />
                </button>
            </div>
        </section>
    );
}
