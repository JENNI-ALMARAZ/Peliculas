import { useState } from "react";
import { PeliculasProvider } from "./context/PeliculasContext";
import Formulario from "./components/Formulario";
import ListaPeliculas from "./components/ListaPeliculas";
import Favoritos from "./components/Favoritos";
import Filtros from "./components/Filtros";

const App = () => {
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [filtro, setFiltro] = useState("");

  return (
    <PeliculasProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            🎬 Gestor de Películas
          </h1>

          <Filtros filtro={filtro} setFiltro={setFiltro} />
          <Formulario />

          <div className="flex justify-center">
            <button
              onClick={() => setMostrarFavoritos(!mostrarFavoritos)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded transition mb-6"
            >
              {mostrarFavoritos ? "📂 Todas" : "⭐ Favoritas"}
            </button>
          </div>

          {mostrarFavoritos ? (
            <Favoritos />
          ) : (
            <ListaPeliculas filtro={filtro} />
          )}
        </div>
      </div>
    </PeliculasProvider>
  );
};

export default App;
