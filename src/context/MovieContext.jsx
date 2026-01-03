import { createContext, useState } from "react";
import axios from "../api/axiosInstance";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (page = 1) => {
    const res = await axios.get(`/movies?page=${page}&limit=6`);
    setMovies(res.data.movies);
    setTotalPages(res.data.totalPages);
  };

  const searchMovies = async (query) => {
    const res = await axios.get(`/movies/search?q=${query}`);
    setMovies(res.data);
    setTotalPages(1);
  };

  const sortMovies = async (sortBy, order = "asc") => {
    const res = await axios.get(
      `/movies/sorted?sortBy=${sortBy}&order=${order}`
    );
    setMovies(res.data);
    setTotalPages(1);
  };

  return (
    <MovieContext.Provider
      value={{ movies, fetchMovies, searchMovies, sortMovies, totalPages }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
