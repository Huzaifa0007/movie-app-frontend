import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminAddMovie from "./pages/AdminAddMovie";
import AdminEditMovie from "./pages/AdminEditMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails />} />

        <Route
          path="/admin/add"
          element={
            <ProtectedRoute adminOnly>
              <AdminAddMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <AdminEditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
