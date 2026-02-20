import React, { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import MovieCard from "@/components/ui/MovieCard";
import FilterSidebar from "@/components/ui/FilterSidebar";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { categories, allMovies } from "@/components/data/movieData";

export default function Browse({ isDark }) {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredMovies = selectedCategory === "All"
        ? allMovies
        : allMovies.filter((_, i) => i % categories.indexOf(selectedCategory) === 0);

    return (
        <div className={`pt-24 md:pt-28 min-h-screen ${isDark ? "" : "bg-gray-100"}`}>
            <div className="max-w-[1800px] mx-auto px-4 md:px-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse</h1>
                        <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Discover your next favorite movie or show
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filters</span>
                        </button>

                        {/* View Mode Toggle */}
                        <div className={`hidden md:flex items-center gap-1 p-1 rounded-lg ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                                    ? "bg-red-600 text-white"
                                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-colors ${viewMode === "list"
                                    ? "bg-red-600 text-white"
                                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar */}
                    <FilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />

                    {/* Content */}
                    <div className="flex-1">
                        {/* Category Pills - Mobile */}
                        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide lg:hidden">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                        ? "bg-red-600 text-white"
                                        : isDark
                                            ? "bg-white/10 text-gray-300 hover:bg-white/20"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Showing {filteredMovies.length} titles
                        </p>

                        {/* Movies Grid */}
                        <div
                            className={`grid gap-4 md:gap-6 ${viewMode === "grid"
                                ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                : "grid-cols-1"
                                }`}
                        >
                            {loading
                                ? [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
                                : filteredMovies.map((movie, index) => (
                                    <div
                                        key={movie.id}
                                        className="animate-fadeInUp"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <MovieCard movie={movie} index={index} />
                                    </div>
                                ))}
                        </div>

                        {/* Load More */}
                        <div className="flex justify-center mt-12">
                            <button className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
