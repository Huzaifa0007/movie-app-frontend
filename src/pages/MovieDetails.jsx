import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Container, Typography, Box, Stack, Divider } from "@mui/material";
import MoreLikeThis from "../components/MoreLikeThis";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useContext(MovieContext);

  const movie = movies.find((m) => m._id === id);

  if (!movie) return <Typography>Movie not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack direction="row" spacing={4}>
        <Box
          component="img"
          src={movie.imageUrl}
          alt={movie.title}
          sx={{ width: 250, borderRadius: 2 }}
        />

        <Box>
          <Typography variant="h4" fontWeight={700}>
            {movie.title}
          </Typography>

          <Stack direction="row" spacing={2} my={2}>
            <Typography>⭐ {movie.rating}</Typography>
            <Typography>{movie.duration} min</Typography>
            <Typography>{new Date(movie.releaseDate).getFullYear()}</Typography>
          </Stack>

          <Typography color="text.secondary">{movie.description}</Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* 🎯 MORE LIKE THIS */}
      <MoreLikeThis currentMovieId={movie._id} />
    </Container>
  );
};

export default MovieDetails;
