import { createContext, useState, useEffect } from "react";
import { obtenerPeliculasLS, guardarPeliculasLS } from "../utils/storage";

export const PeliculasContext = createContext();

export const PeliculasProvider = ({ children }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [peliculaEnEdicion, setPeliculaEnEdicion] = useState(null);

  // Cargar películas del localStorage
  useEffect(() => {
    const peliculasGuardadas = obtenerPeliculasLS();
    setPeliculas(peliculasGuardadas);
  }, []);

  // Guardar películas en el localStorage cada vez que cambian
  useEffect(() => {
    if (peliculas.length > 0) {
      guardarPeliculasLS(peliculas);
      setFavoritos(peliculas.filter((p) => p.favorito));  // Sincroniza los favoritos
    }
  }, [peliculas]);

  // Agregar una nueva película
  const agregarPelicula = (pelicula) => {
    setPeliculas((prevPeliculas) => [...prevPeliculas, pelicula]);
  };

  // Eliminar una película por ID
  const eliminarPelicula = (id) => {
    setPeliculas((prevPeliculas) => prevPeliculas.filter((peli) => peli.id !== id));
  };

  // Alternar el estado de favorito de una película
  const toggleFavorito = (id) => {
    setPeliculas((prevPeliculas) =>
      prevPeliculas.map((peli) =>
        peli.id === id ? { ...peli, favorito: !peli.favorito } : peli
      )
    );
  };

  // Editar una película existente
  const editarPelicula = (peliculaActualizada) => {
    setPeliculas((prevPeliculas) =>
      prevPeliculas.map((peli) =>
        peli.id === peliculaActualizada.id ? peliculaActualizada : peli
      )
    );
    setPeliculaEnEdicion(null);  // Limpiar el estado de edición
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
        editarPelicula,
      }}
    >
      {children}
    </PeliculasContext.Provider>
  );
};
