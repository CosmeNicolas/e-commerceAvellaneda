import axios from 'axios'


const  token = JSON.parse(sessionStorage.getItem('token'))
console.log(token)
const clienteAxios = axios.create({
  /* baseURL:`${import.meta.env.VITE_URL_BACK_LOCAL}/api` */
  baseURL:`${import.meta.env.VITE_URL_BACK_LOCAL}/api`
})



/* configuracion de la cabecera para el token */
export const configHeaders = {
  headers: {
    "content-type": "application/json",
    "auth": `${token}`
  }
};


/* configuracion de la cabecera para el token */
/* export const configHeadersImagen= {
  headers: {
    "content-type": "multipart/form-data",
    "auth": `${token}`  // Asegúrate de que este token es válido
  }
}; */
export const configHeadersImagen = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Incluye el token si es necesario
  },
};

export default clienteAxios