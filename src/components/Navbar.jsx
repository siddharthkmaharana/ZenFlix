import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-12 py-3 md:py-4 flex items-center justify-between",
            isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"
        )}>
            <div className="flex items-center gap-8">
                <Link to="/" className="text-2xl md:text-3xl font-bold text-red-600 tracking-tighter hover:scale-105 transition-transform">
                    ZENFLIX
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/series" className="hover:text-white transition-colors">TV Shows</Link>
                    <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
                    <Link to="/new" className="hover:text-white transition-colors">New & Popular</Link>
                    <Link to="/list" className="hover:text-white transition-colors">My List</Link>
                </div>
            </div>

            <div className="flex items-center gap-4 text-white">
                <div className={cn(
                    "flex items-center border border-white/20 bg-black/50 rounded-full px-3 py-1 transition-all duration-300",
                    isSearchOpen ? "w-64 opacity-100" : "w-8 opacity-100 border-transparent bg-transparent"
                )}>
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                    </button>
                    <input
                        type="text"
                        placeholder="Titles, people, genres"
                        className={cn(
                            "bg-transparent border-none outline-none text-sm ml-2 text-white w-full placeholder:text-gray-400",
                            isSearchOpen ? "block" : "hidden"
                        )}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    />
                </div>
                <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 hidden sm:block" />
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-md bg-green-600 flex items-center justify-center text-xs font-bold">
                        <User className="w-5 h-5" />
                    </div>
                    <span className="text-xs transition-transform group-hover:rotate-180">▼</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
