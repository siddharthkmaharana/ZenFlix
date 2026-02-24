import React from "react";
import { X } from "lucide-react";

export default function FilterSidebar({ categories, selectedCategory, onCategoryChange, isOpen, onClose }) {
    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#141414] border-r border-white/10 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:bg-transparent lg:border-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-8 lg:hidden">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        onCategoryChange(category);
                                        if (window.innerWidth < 1024) onClose();
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                            ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Content Type</h3>
                        <div className="space-y-2">
                            <button className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                Movies
                            </button>
                            <button className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                TV Shows
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
