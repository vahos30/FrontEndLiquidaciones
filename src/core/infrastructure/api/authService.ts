export const obtenerToken = async (): Promise<string> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    //console.error("No se encontró el token en Local Storage");
    return "error";
  }

  return token;
};
