import React, { useState, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import ProfileCard from "@/components/ui/ProfileCard";
import { profiles } from "@/components/data/movieData";

export default function Profiles({ isDark }) {
    const [loaded, setLoaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "" : "bg-gray-100"}`}>
            <div
                className={`text-center transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Who's Watching?
                </h1>
                <p className={`mb-12 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    Select your profile to continue
                </p>

                {/* Profiles Grid */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
                    {profiles.map((profile, index) => (
                        <div
                            key={profile.id}
                            className="animate-fadeInUp"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <ProfileCard profile={profile} isEditing={isEditing} />
                        </div>
                    ))}

                    {/* Add Profile */}
                    <div
                        className="animate-fadeInUp"
                        style={{ animationDelay: `${profiles.length * 100}ms` }}
                    >
                        <button className="flex flex-col items-center gap-3 group">
                            <div className={`w-24 h-24 md:w-36 md:h-36 rounded-xl flex items-center justify-center transition-all duration-300 ${isDark
                                ? "bg-gray-800 group-hover:bg-gray-700"
                                : "bg-gray-200 group-hover:bg-gray-300"
                                } group-hover:scale-110 group-hover:ring-4 group-hover:ring-white/20`}>
                                <Plus className={`w-12 h-12 ${isDark ? "text-gray-400" : "text-gray-500"} group-hover:text-white transition-colors`} />
                            </div>
                            <span className={`text-sm md:text-lg font-medium ${isDark ? "text-gray-400" : "text-gray-600"} group-hover:text-white transition-colors`}>
                                Add Profile
                            </span>
                        </button>
                    </div>
                </div>

                {/* Manage Profiles Button */}
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${isEditing
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : isDark
                            ? "bg-transparent border border-gray-600 text-gray-400 hover:border-white hover:text-white"
                            : "bg-transparent border border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <Pencil className="w-4 h-4" />
                        {isEditing ? "Done" : "Manage Profiles"}
                    </span>
                </button>
            </div>
        </div>
    );
}
