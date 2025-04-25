import { createContext, useState, useEffect } from "react";
import { obtenerPeliculasLS, guardarPeliculasLS } from "../utils/storage";

export const PeliculasContext = createContext();

export const PeliculasProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [peliculaEnEdicion, setPeliculaEnEdicion] = useState(null);

  useEffect(() => {
    const peliculasGuardadas = obtenerPeliculasLS();
    setPeliculas(peliculasGuardadas);
    setFavoritos(peliculasGuardadas.filter((p) => p.favorito));
  }, []);

  useEffect(() => {
    guardarPeliculasLS(peliculas);
    setFavoritos(peliculas.filter((p) => p.favorito));
  }, [peliculas]);

  const agregarPelicula = (pelicula) => {
    setPeliculas([...peliculas, pelicula]);
  };

  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter((peli) => peli.id !== id));
  };

  const toggleFavorito = (id) => {
    const actualizadas = peliculas.map((peli) =>
      peli.id === id ? { ...peli, favorito: !peli.favorito } : peli
    );
    setPeliculas(actualizadas);
  };

  const editarPelicula = (peliculaActualizada) => {
    const actualizadas = peliculas.map((peli) =>
      peli.id === peliculaActualizada.id ? peliculaActualizada : peli
    );
    setPeliculas(actualizadas);
    setPeliculaEnEdicion(null);
  };

  return (
    <PeliculasContext.Provider
      value={{
        peliculas,
        agregarPelicula,
        eliminarPelicula,
        favoritos,
        toggleFavorito,
        peliculaEnEdicion,
        setPeliculaEnEdicion,
        editarPelicula
      }}
    >
      {children}
    </PeliculasContext.Provider>
  );
};