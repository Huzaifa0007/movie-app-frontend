import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const MovieCard = ({ movie }) => {
  const { role } = useContext(AuthContext);
  const { fetchMovies } = useContext(MovieContext);
  const navigate = useNavigate();

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "N/A";

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this movie?")) return;
    await axios.delete(`/movies/${movie._id}`);
    fetchMovies(1);
  };

  return (
    <Card
      onClick={() => navigate(`/movies/${movie._id}`)}
      sx={{
        display: "flex",
        width: "100%",
        minHeight: 180,
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      {/* 🎞️ IMAGE */}
      <Box sx={{ width: 130, minWidth: 130 }}>
        <Box
          component="img"
          src={movie.imageUrl || "https://placehold.co/130x180?text=No+Image"}
          alt={movie.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px 0 0 8px",
          }}
        />
      </Box>

      {/* 📄 INFO */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {movie.title}
          </Typography>

          <Stack direction="row" spacing={2} color="text.secondary" mb={1}>
            <Typography variant="body2">{releaseYear}</Typography>
            <Typography variant="body2">⭐ {movie.rating}</Typography>
            <Typography variant="body2">⏱ {movie.duration} min</Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.description}
          </Typography>
        </CardContent>

        {role === "admin" && (
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/edit/${movie._id}`);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardActions>
        )}
      </Box>
    </Card>
  );
};

export default MovieCard;
