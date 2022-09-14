const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const seccionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonReiniciar = document.getElementById("boton-reiniciar");

const seccionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const divJugador = document.getElementById("ataque-del-jugador");
const divEnemigo = document.getElementById("ataque-del-enemigo");

const sectionMensajes = document.getElementById("mensajes");

//array Mokepones (vacia ;) )
let mokepones = [];

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// clase, va con mayuscula, es el "plano" para el objeto (el personaje en este caso). Con constructor. Es escalable, se le pueden agregar mas propiedades
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
    }
}

//objeto hecho con la clase Mokepon. los valores con comillas simples
let hipodoge = new Mokepon(
    "Hipodoge",
    "assets/mokepons_mokepon_hipodoge_attack.png",
    5
);
let capipepo = new Mokepon(
    "Capipepo",
    "assets/mokepons_mokepon_capipepo_attack.png",
    5
);
let ratigueya = new Mokepon(
    "Ratigueya",
    "assets/mokepons_mokepon_ratigueya_attack.png",
    5
);
//para probar objeto
//console.log(hipodoge);

//con push inyecto/empujo valores en la variable
mokepones.push(hipodoge, capipepo, ratigueya);

//testeo el array  mokepones
// console.log(mokepones);

function iniciarJuego() {
    seccionSeleccionarAtaque.style.display = "none";
    seccionReiniciar.style.display = "none";
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonFuego.addEventListener("click", ataqueFuego);
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    seccionSeleccionarAtaque.style.display = "block";
    seccionSeleccionarMascota.style.display = "none";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Selecciona una mascota");
    }

    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3);

    if (mascotaAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoge";
    } else if (mascotaAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = "Capipepo";
    } else if (mascotaAleatoria == 3) {
        spanMascotaEnemigo.innerHTML = "Ratigueya";
    } else {
        alert("el enemigo no tiene mascota");
    }
}

function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
}
function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
}
function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "FUEGO";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "AGUA";
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = "TIERRA";
    } else {
        alert("el enemigo NO ATACÓ");
    }
    combate();
}

function crearMensaje(resultado) {
    let notificacion = document.createElement("p");
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    sectionMensajes.appendChild(notificacion);
    divJugador.appendChild(nuevoAtaqueJugador);
    divEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function combate() {
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
        (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
        (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones, ganaste! :)");
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Lo siento, perdiste :(");
    }
}

function crearMensajeFinal(resultadoFinal) {
    let parrafo = document.createElement("p");

    sectionMensajes.innerHTML = resultadoFinal;
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    seccionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
