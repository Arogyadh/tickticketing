"use client";
import Cards from "@/components/shared/Cards";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.omdbapi.com/?apikey=bd6e4ec1&s=Dogs"
        );
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-[147px]  ml-[100px] grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <div key={movie.Title}>
          <Cards
            imdbID={movie.imdbID}
            key={movie.imdbID}
            movie={movie.Title}
            src={movie.Poster}
            released={movie.Year}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;
