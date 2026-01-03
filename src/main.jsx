import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import MovieProvider from "./context/MovieContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
  </AuthProvider>
);
