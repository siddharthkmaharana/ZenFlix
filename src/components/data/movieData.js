export const categories = [
    "All", "Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Documentary", "Animation"
];

export const allMovies = [
    {
        id: 1,
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
        poster_path: "/gEU2QniE6E77vl6P36GvRfbpLpL.jpg",
        backdrop_path: "/rAi4OOpgCmtv4zbNNjXUrtYI1zj.jpg",
        year: "2014",
        rating: "PG-13",
        duration: "2h 49m",
        vote_average: 8.7,
        vote_count: 32000,
        genres: ["Sci-Fi", "Drama", "Adventure"]
    },
    {
        id: 2,
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        backdrop: "https://images.unsplash.com/photo-1542204172-3c1356e9f697?q=80&w=2070&auto=format&fit=crop",
        poster_path: "/edv5CZvj09M9O76SSTliFnjsYpA.jpg",
        backdrop_path: "/8ZTPRkdTSBMG6uA699v19Lth7S8.jpg",
        year: "2010",
        rating: "PG-13",
        duration: "2h 28m",
        vote_average: 8.8,
        vote_count: 35000,
        genres: ["Action", "Sci-Fi", "Adventure"]
    },
    {
        id: 3,
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        backdrop: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2037&auto=format&fit=crop",
        poster_path: "/qJ2tW6WMUDp9QmSbmrKwszOzes4.jpg",
        backdrop_path: "/nMKd83mzOqr5wXv00uffKAhMTvO.jpg",
        year: "2008",
        rating: "PG-13",
        duration: "2h 32m",
        vote_average: 9.0,
        vote_count: 31000,
        genres: ["Action", "Crime", "Drama"]
    },
    {
        id: 4,
        title: "Parasite",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        backdrop: "https://images.unsplash.com/photo-1559136103-348398e096f2?q=80&w=2070&auto=format&fit=crop",
        poster_path: "/7IiTTjMvS2zsI7Z7S3CcL3MGccD.jpg",
        backdrop_path: "/TU9NIjwzjoOTqvQCHZ1vIyG0O6.jpg",
        year: "2019",
        rating: "R",
        duration: "2h 12m",
        vote_average: 8.5,
        vote_count: 15000,
        genres: ["Drama", "Thriller"]
    },
    {
        id: 5,
        title: "Spider-Man: Across the Spider-Verse",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
        backdrop: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop",
        poster_path: "/8VtbiU97S6S6vS9Y9Y9Y9Y9Y9Y9.jpg",
        backdrop_path: "/4HodYYKEIsS6onS93u9vIvH9vI.jpg",
        year: "2023",
        rating: "PG",
        duration: "2h 20m",
        vote_average: 8.9,
        vote_count: 5000,
        genres: ["Animation", "Action", "Adventure"]
    }
];

export const movieDetails = {
    ...allMovies[0],
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    rottenTomatoes: 73,
    imdbRating: 8.7,
    director: "Christopher Nolan",
    cast: [
        { name: "Matthew McConaughey", role: "Cooper", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
        { name: "Anne Hathaway", role: "Brand", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
        { name: "Jessica Chastain", role: "Murph", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
        { name: "Michael Caine", role: "Professor Brand", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" }
    ]
};

export const movies = {
    trending: allMovies,
    scifi: [allMovies[0], allMovies[1]],
    popular: [allMovies[2], allMovies[3]],
    new: [allMovies[4]]
};

export const profiles = [
    { id: 1, name: "Owner", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
    { id: 2, name: "Guest", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
    { id: 3, name: "Kids", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop" }
];
