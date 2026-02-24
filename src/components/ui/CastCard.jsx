import React from "react";

export default function CastCard({ actor }) {
    return (
        <div className="flex-shrink-0 w-32 md:w-40 text-center group cursor-pointer">
            <div className="relative aspect-square rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-red-600 transition-all duration-300">
                <img
                    src={actor.image}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            <h3 className="font-bold text-white text-sm md:text-base mb-1 truncate">
                {actor.name}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm truncate">
                {actor.role}
            </p>
        </div>
    );
}
