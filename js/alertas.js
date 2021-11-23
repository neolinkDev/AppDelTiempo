const d = document;
// Función que muestra alertas al validar
export default function showAlert(warning){
    const error = d.querySelector('.error');
    if(!error){
        const alertaSpan = d.createElement('SPAN');
        const alert = d.querySelector('.warn');
        
        alertaSpan.textContent = warning;
        alertaSpan.classList.add('error');
        alert.insertAdjacentElement('beforeend', alertaSpan)
        
        // Usamos un setTimeOut para borrar la alerta
        setTimeout(() => {
            alertaSpan.remove()
        }, 3000);
    }
    
}