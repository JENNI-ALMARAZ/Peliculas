import { useContext } from "react";
import { PeliculasContext } from "../context/PeliculasContext";

const Favoritos = () => {
  const { peliculas } = useContext(PeliculasContext);

  const favoritas = peliculas.filter((p) => p.favorito);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Películas Favoritas</h2>
      {favoritas.length === 0 ? (
        <p className="text-gray-500">No tienes películas marcadas como favoritas.</p>
      ) : (
        favoritas.map((pelicula) => (
          <div
            key={pelicula.id}
            className="bg-white border-l-4 border-yellow-400 p-4 rounded-md shadow-sm mb-3"
          >
            <h3 className="text-lg font-bold text-gray-800">{pelicula.titulo}</h3>
            <p className="text-gray-700">{pelicula.descripcion}</p>
            <p className="text-sm text-gray-500 italic">Género: {pelicula.genero}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favoritos;
