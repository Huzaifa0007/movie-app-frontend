import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "../api/axiosInstance";

const AdminAddMovie = () => {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: "",
    imageUrl: "", // ✅ NEW
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/movies", movie);
      alert("Movie added successfully");
    } catch {
      alert("Error adding movie");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Movie
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="description"
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          onChange={handleChange}
        />

        <TextField
          name="imageUrl"
          label="Image URL"
          fullWidth
          margin="normal"
          onChange={handleChange}
          helperText="Paste hosted image URL (Google, IMDb, etc.)"
        />

        <TextField
          name="rating"
          label="Rating"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="duration"
          label="Duration (mins)"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          name="releaseDate"
          type="date"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Movie
        </Button>
      </form>
    </Container>
  );
};

export default AdminAddMovie;
