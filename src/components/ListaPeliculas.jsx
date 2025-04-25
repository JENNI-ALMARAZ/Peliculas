import { useContext } from "react";
import { PeliculasContext } from "../context/PeliculasContext";
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";

const ListaPeliculas = ({ filtro }) => {
  const {
    peliculas,
    eliminarPelicula,
    toggleFavorito,
    setPeliculaEnEdicion,
  } = useContext(PeliculasContext);

  const filtradas = peliculas.filter((peli) => {
    return (
      peli.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      peli.genero.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  if (filtradas.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        No hay películas que coincidan con el filtro.
      </p>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {filtradas.map((pelicula) => (
        <div
          key={pelicula.id}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {pelicula.titulo}
            </h3>
            <button
              onClick={() => toggleFavorito(pelicula.id)}
              className={`text-xl transition ${
                pelicula.favorito ? "text-red-500" : "text-gray-400 hover:text-red-400"
              }`}
              title={pelicula.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {pelicula.favorito ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <p className="text-gray-600 mb-1">{pelicula.descripcion}</p>
          <p className="text-sm text-blue-500 font-medium">
            Género: {pelicula.genero}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setPeliculaEnEdicion(pelicula)}
              className="flex items-center gap-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full text-sm font-medium transition"
            >
              <FaEdit /> Editar
            </button>
            <button
              onClick={() => eliminarPelicula(pelicula.id)}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium transition"
            >
              <FaTrash /> Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaPeliculas;
