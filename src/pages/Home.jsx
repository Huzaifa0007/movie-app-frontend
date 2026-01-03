import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Container, Pagination, TextField, MenuItem, Box } from "@mui/material";

const Home = () => {
  const { movies, fetchMovies, searchMovies, sortMovies, totalPages } =
    useContext(MovieContext);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") fetchMovies(1);
    else searchMovies(value);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (!value) return;

    // ⭐ Rating & 📅 Release Date → DESC
    if (value === "rating" || value === "releaseDate") {
      sortMovies(value, "desc");
    } else {
      sortMovies(value, "asc");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* 🔍 SEARCH + FILTER */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          backgroundColor: "#fafafa",
          boxShadow: 1,
          maxWidth: "900px",
          mx: "auto",
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          label="Search movies"
          value={search}
          onChange={handleSearch}
          fullWidth
          sx={{ flex: 3 }}
        />

        <TextField
          select
          label="Filter"
          value={sortBy}
          onChange={handleSort}
          sx={{ flex: 1 }}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </TextField>
      </Box>

      {/* 🎬 MOVIE LIST (FULL WIDTH ROWS) */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Box>

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Container>
  );
};

export default Home;
