import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movie App
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        {!token && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}

        {!token && (
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        )}

        {role === "admin" && (
          <Button color="inherit" component={Link} to="/admin/add">
            Add Movie
          </Button>
        )}

        {token && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
