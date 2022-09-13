let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let seccionSeleccionarAtaque =
        document.getElementById("seleccionar-ataque");
    seccionSeleccionarAtaque.style.display = "none";

    let seccionReiniciar = document.getElementById("reiniciar");
    seccionReiniciar.style.display = "none";

    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.addEventListener("click", ataqueTierra);
    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let seccionSeleccionarAtaque =
        document.getElementById("seleccionar-ataque");
    seccionSeleccionarAtaque.style.display = "block";

    let seccionSeleccionarMascota = document.getElementById(
        "seleccionar-mascota"
    );
    seccionSeleccionarMascota.style.display = "none";

    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

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
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

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
    let sectionMensajes = document.getElementById("resultados");
    let divJugador = document.getElementById("ataque-del-jugador");
    let divEnemigo = document.getElementById("ataque-del-enemigo");

    let notificacion = document.createElement("p");
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    // let parrafo = document.createElement("p");

    // parrafo.innerHTML =
    //     "Tu mascota atacó con " +
    //     ataqueJugador +
    //     ", la mascota del enemigo atacó con " +
    //     ataqueEnemigo +
    //     ". " +
    //     resultado;

    // sectionMensajes.appendChild(parrafo);

    // sectionMensajes.appendChild(parrafo);

    sectionMensajes.appendChild(notificacion);
    divJugador.appendChild(nuevoAtaqueJugador);
    divEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

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
    let sectionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");

    sectionMensajes.innerHTML = resultadoFinal;

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.disabled = true;
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.disabled = true;
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.disabled = true;
    let seccionReiniciar = document.getElementById("reiniciar");
    seccionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
