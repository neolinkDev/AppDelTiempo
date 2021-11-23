import showAlert from "./alertas.js";

const d = document;
const show = d.getElementById('resultado');

// Conectando con la API
export default function API(ciudad){
    const apiKey = 'f4d64c9103cba3bed079b876f2ba5fdc';

    // llamando API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&lang=es`;
    
    spinner();

    fetch(url)
        .then( response => response.json())
        .then( data => {
            cleanHTML();
            console.log(data)
            if(data.cod === '404'){
                showAlert('Ciudad no encontrada')
                return
            }
            // mostrando data en el HTML
            weatherForecast(data);
        })
        .catch(() => showAlert('ERROR!'));
}

// Muestra los datos de la API
function weatherForecast(data){
    const date = new Date();
    const dateTime = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(date);

    const { main: { feels_like, temp, temp_max, temp_min }, name, sys: { country }, weather: [{ description, icon}] } = data;

    const celsius = kelvinCelsius(temp);
    const sensacionTermica = kelvinCelsius(feels_like);
    const temperaturaMin = kelvinCelsius(temp_min);
    const temperaturaMax = kelvinCelsius(temp_max);

    // Fecha
    const timeDateFormat = d.createElement('P');
    timeDateFormat.textContent = `${dateTime}`;
    timeDateFormat.classList.add('divTimeDateFormat');

    // Ciudad
    const city = d.createElement('P');
    city.textContent = `${name}, ${country}`;
    const divCity = d.createElement('div');
    divCity.classList.add('divCity');
    divCity.appendChild(city);

    // Temperatura
    const temperatura = d.createElement('P');
    temperatura.innerHTML = `${celsius}&deg;`;
    const flex = d.createElement('div');
    flex.classList.add('divTemp', 'flex');
    flex.appendChild(temperatura);
    
    // Icono
    const image = d.createElement('IMG')
    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    image.alt = 'icono';
    flex.appendChild(image)

    // Descripción
    const desc = d.createElement('P');
    desc.textContent = `${description}`;
    const divDesc = d.createElement('DIV');
    divDesc.classList.add('divDesc');
    divDesc.appendChild(desc);

    // Sensación térmica
    const feelsLike = d.createElement('p')
    feelsLike.innerHTML = `
        Sensación térmica ${sensacionTermica}&deg;
    `;
    const divFeelsLike = d.createElement('DIV');
    divFeelsLike.classList.add('divFeelsLike');
    divFeelsLike.appendChild(feelsLike);

    // Temperatura máxima y mínimina
    const temps = d.createElement('P');
    temps.innerHTML = `Max  ${temperaturaMax}&deg / Min  ${temperaturaMin}&deg`;
    temps.classList.add('divTemps');

    
    show.appendChild(timeDateFormat);
    show.appendChild(divCity);
    // show.appendChild(flex);
    show.appendChild(flex);
    show.appendChild(divDesc);
    show.appendChild(divFeelsLike);
    show.appendChild(temps);
}

// Convierte los grados kelvin que proporciona la API a grados centígrados(celsius)
/* Convertir a grados centigrados --> dato a calcular - 273.5 */
const kelvinCelsius = degrees => parseInt(degrees - 273.15);

// Limpia el HTML generado con los datos
function cleanHTML(){
    while(show.firstChild){
        show.removeChild(show.firstChild);
    }
}

// Spinner de carga
function spinner(){
    cleanHTML();

    const divSpinner = d.createElement('DIV');
    divSpinner.classList.add('sk-cube-grid');

    divSpinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    show.appendChild(divSpinner);
}