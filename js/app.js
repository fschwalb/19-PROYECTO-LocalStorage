/* ============================= VARIABLES ============================= */


const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];









/* ========================== EVENT LISTENER =========================== */


eventListeners();

function eventListeners() {

    // Cuando se agrega un nuevo Tweet
    formulario.addEventListener('submit', agregarTweet);

    // // Borrar Tweets
    // listaTweets.addEventListener('click', borrarTweet);

    // Cuando el documento está listo muestra el contenido
    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem( 'tweets' )) || [];


        crearHTML();

    });

}










/* ============================= FUNCIONES ============================= */


function agregarTweet(e) {

    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if (tweet === '') {

        mostrarError('¡No puedes crear un Tweet vacío!');

        return; // Evita que se ejecute el siguiente código

    }

    const tweetObj = {

        id : Date.now(),
        tweet // Esto es igal que escribir tweet : tweet

    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Crear el HTML
    crearHTML();

    // Reiniciar el Formulario
    formulario.reset();

}

// Mostrar msj de error

function mostrarError(error) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Para eliminar la alerta
    setTimeout(() => {

        mensajeError.remove();

    }, 1500);

}

// Muestra un listado de los Tweets

function crearHTML() {

    limpiarHTML();
    
    if (tweets.length > 0) {
        
        tweets.forEach( tweet => {

            // Agregar botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir Función de Eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botón de eliminar
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);

        });

    }

    sincronizarStorage();

}

// Agrega los Tweets al localStorage

function sincronizarStorage() {
    
    localStorage.setItem('tweets', JSON.stringify( tweets ));

}

// Eliminar Tweet

function borrarTweet(id) {

    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();

}

// Limpiar el HTML ( Para que no se repita el appendChild )

function limpiarHTML() {

    while (listaTweets.firstChild) {

        listaTweets.removeChild(listaTweets.firstChild);

    }

}
