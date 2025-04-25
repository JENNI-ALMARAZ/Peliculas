

export const obtenerPeliculasLS = () => {
  const data = localStorage.getItem("peliculas");
  return data ? JSON.parse(data) : [];
};

export const guardarPeliculasLS = (peliculas) => {
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
};
