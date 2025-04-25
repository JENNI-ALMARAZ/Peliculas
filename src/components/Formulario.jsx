import { useContext, useEffect, useState } from "react";
import { PeliculasContext } from "../context/PeliculasContext";

const Formulario = () => {
  const {
    agregarPelicula,
    editarPelicula,
    peliculaEnEdicion,
  } = useContext(PeliculasContext);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    if (peliculaEnEdicion) {
      setTitulo(peliculaEnEdicion.titulo);
      setDescripcion(peliculaEnEdicion.descripcion);
      setGenero(peliculaEnEdicion.genero);
    }
  }, [peliculaEnEdicion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peliculaEnEdicion) {
      editarPelicula({
        ...peliculaEnEdicion,
        titulo,
        descripcion,
        genero,
      });
    } else {
      agregarPelicula({
        id: Date.now(),
        titulo,
        descripcion,
        genero,
        favorito: false,
      });
    }
    setTitulo("");
    setDescripcion("");
    setGenero("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md max-w-lg mx-auto mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {peliculaEnEdicion ? "Editar Película" : "🎥 Agregar Película"}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-medium transition"
      >
        {peliculaEnEdicion ? "Guardar Cambios" : "Guardar"}
      </button>
    </form>
  );
};

export default Formulario;
