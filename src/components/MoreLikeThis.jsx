import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MoreLikeThis = ({ currentMovieId }) => {
  const { movies } = useContext(MovieContext);
  const navigate = useNavigate();

  const similarMovies = movies.filter((m) => m._id !== currentMovieId);

  return (
    <>
      <Typography variant="h6" fontWeight={600} mb={2}>
        More like this
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {similarMovies.map((movie) => (
          <Card
            key={movie._id}
            onClick={() => navigate(`/movies/${movie._id}`)}
            sx={{
              minWidth: 160,
              maxWidth: 160,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            {/* 🎞️ IMAGE */}
            <CardMedia
              component="img"
              height="240"
              image={
                movie.imageUrl || "https://placehold.co/160x240?text=No+Image"
              }
              alt={movie.title}
            />

            {/* 📄 INFO */}
            <CardContent sx={{ p: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                ⭐ {movie.rating}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {movie.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default MoreLikeThis;
