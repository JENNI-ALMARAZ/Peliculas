import { useState, useEffect } from "react";
import { getPeliculasFromStorage, savePeliculasToStorage } from "../utils/storage";

const usePeliculasStorage = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const stored = getPeliculasFromStorage();
    setPeliculas(stored);
  }, []);

  useEffect(() => {
    savePeliculasToStorage(peliculas);
  }, [peliculas]);

  const agregarPelicula = (pelicula) => {
    const nueva = {
      ...pelicula,
      id: Date.now(),
      favorita: false,
    };
    setPeliculas([...peliculas, nueva]);
  };

  const eliminarPelicula = (id) => {
    setPeliculas(peliculas.filter((p) => p.id !== id));
  };

  const toggleFavorita = (id) => {
    setPeliculas(
      peliculas.map((p) =>
        p.id === id ? { ...p, favorita: !p.favorita } : p
      )
    );
  };

  return { peliculas, agregarPelicula, eliminarPelicula, toggleFavorita };
};

export default usePeliculasStorage;
