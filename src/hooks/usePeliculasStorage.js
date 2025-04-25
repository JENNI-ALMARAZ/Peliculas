import { useState, useEffect } from "react";
import {
  getPeliculasFromStorage,
  savePeliculasToStorage,
} from "../utils/storage";

const usePeliculasStorage = () => {
  const [peliculas, setPeliculas] = useState(() => getPeliculasFromStorage());

  useEffect(() => {
    savePeliculasToStorage(peliculas);
  }, [peliculas]);

  const agregarPelicula = (pelicula) => {
    const nueva = {
      ...pelicula,
      id: Date.now(),
      favorita: false,
    };
    setPeliculas((prev) => [...prev, nueva]);
  };

  const eliminarPelicula = (id) => {
    setPeliculas((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavorita = (id) => {
    setPeliculas((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, favorita: !p.favorita } : p
      )
    );
  };

  return { peliculas, agregarPelicula, eliminarPelicula, toggleFavorita };
};

export default usePeliculasStorage;
