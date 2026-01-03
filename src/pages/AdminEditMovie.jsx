import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { Container, TextField, Button, Typography } from "@mui/material";

const AdminEditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
  });

  useEffect(() => {
    axios.get(`/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await axios.put(`/movies/${id}`, movie);
    alert("Movie updated");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Movie
      </Typography>

      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={movie.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        fullWidth
        margin="normal"
        value={movie.description}
        onChange={handleChange}
      />
      <TextField
        name="rating"
        label="Rating"
        fullWidth
        margin="normal"
        value={movie.rating}
        onChange={handleChange}
      />
      <TextField
        name="duration"
        label="Duration"
        fullWidth
        margin="normal"
        value={movie.duration}
        onChange={handleChange}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default AdminEditMovie;
