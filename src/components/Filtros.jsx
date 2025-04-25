// src/components/Filtros.jsx
const Filtros = ({ filtro, setFiltro }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por título o género"
      className="border p-2 w-full mb-4"
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
    />
  );
};

export default Filtros;
