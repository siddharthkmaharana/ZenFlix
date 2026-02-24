import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function MovieSection({ title, movies }) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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

    useEffect(() => {
        handleScroll();
    }, [movies]);

    if (!movies || !movies.length) return null;

    return (
        <section className="relative py-8 group/section max-w-[1800px] mx-auto overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 md:px-12">
                {title}
            </h2>

            <div className="relative group/slider">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className={`absolute left-0 top-0 bottom-0 z-50 w-16 bg-gradient-to-r from-black via-black/40 to-transparent flex items-center justify-center transition-all duration-300 ${showLeftArrow ? "opacity-0 group-hover/slider:opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    <ChevronLeft className="w-12 h-12 text-white drop-shadow-lg" />
                </button>

                {/* Movies Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-8 scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {movies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className={`absolute right-0 top-0 bottom-0 z-50 w-16 bg-gradient-to-l from-black via-black/40 to-transparent flex items-center justify-center transition-all duration-300 ${showRightArrow ? "opacity-0 group-hover/slider:opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    <ChevronRight className="w-12 h-12 text-white drop-shadow-lg" />
                </button>
            </div>
        </section>
    );
}
