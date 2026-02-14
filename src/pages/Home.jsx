import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import { tmdb, genres } from '@/api/tmdb';

const Home = () => {
    return (
        <div className="bg-background min-h-screen pb-10 overflow-x-hidden">
            <Navbar />
            <Hero />

            <div className="relative z-20 -mt-24 md:-mt-48 space-y-4 md:space-y-8 lg:space-y-12 pb-10">
                <MovieRow
                    title="Trending Now"
                    fetchFn={() => tmdb.getTrending()}
                    isLargeRow
                />
                <MovieRow
                    title="Top Rated"
                    fetchFn={() => tmdb.getTopRated()}
                />
                <MovieRow
                    title="Action Movies"
                    fetchFn={() => tmdb.getMoviesByGenre(genres.action)}
                />
                <MovieRow
                    title="Comedy Movies"
                    fetchFn={() => tmdb.getMoviesByGenre(genres.comedy)}
                />
                <MovieRow
                    title="Horror Movies"
                    fetchFn={() => tmdb.getMoviesByGenre(genres.horror)}
                />
                <MovieRow
                    title="Romance Movies"
                    fetchFn={() => tmdb.getMoviesByGenre(genres.romance)}
                />
                <MovieRow
                    title="Documentaries"
                    fetchFn={() => tmdb.getMoviesByGenre(genres.documentary)}
                />
            </div>

            <footer className="text-center text-gray-500 text-sm py-8 px-4 mt-8 border-t border-gray-800">
                <p>ZenFlix - A Netflix Clone Project</p>
                <div className="flex justify-center gap-4 mt-4">
                    <span className="cursor-pointer hover:underline">Terms of Use</span>
                    <span className="cursor-pointer hover:underline">Privacy</span>
                    <span className="cursor-pointer hover:underline">Cookie Preferences</span>
                </div>
            </footer>
        </div>
    );
};

export default Home;
