import React from "react";
import { Link } from "react-router-dom";
import { Edit2 } from "lucide-react";

export default function ProfileCard({ profile, isEditing }) {
    return (
        <Link to="/" className="flex flex-col items-center gap-3 group relative">
            <div className={`relative w-24 h-24 md:w-36 md:h-36 rounded-xl overflow-hidden transition-all duration-300 ${isEditing ? "scale-95 brightness-50" : "group-hover:scale-110 group-hover:ring-4 group-hover:ring-white/20"}`}>
                <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                />

                {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Edit2 className="w-8 h-8 text-white" />
                    </div>
                )}
            </div>

            <span className={`text-sm md:text-lg font-medium transition-colors ${isEditing ? "text-gray-400" : "text-gray-400 group-hover:text-white"}`}>
                {profile.name}
            </span>
        </Link>
    );
}
