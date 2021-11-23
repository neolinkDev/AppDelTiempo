import showAlert from "./alertas.js";
import API from "./consultando_API.js";
const d = document;
// const expresion = /^[a-zA-Z0-9\s]$/;

export default function searchForm(idFormulario){

    d.addEventListener('submit', e => {
        e.preventDefault();
        if(e.target.matches(idFormulario)){
            // Validando el input
            const ciudad = d.getElementById('city').value;
            // console.log(ciudad)

            if(ciudad === ''){
                showAlert('El campo no puede ir vacío');
                return;
            }

            API(ciudad);
        }
    });
}