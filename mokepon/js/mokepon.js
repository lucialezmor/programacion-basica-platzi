const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const seccionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const seccionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
);

const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const divJugador = document.getElementById("ataque-del-jugador");
const divEnemigo = document.getElementById("ataque-del-enemigo");

const sectionMensajes = document.getElementById("mensajes");

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

const contenedorAtaques = document.getElementById("contenedor-ataques");

//array Mokepones (vacia ;) )
let mokepones = [];

let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
//las pego despues de la opcion de pokemones, xq antes no fueron creadas
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let mascotaJugador;
let mascotaEnemigo;

let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;

let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;

let vidasJugador = 3;
let vidasEnemigo = 3;

// clase, va con mayuscula, es el "plano" para el objeto (el personaje en este caso). Con constructor. Es escalable, se le pueden agregar mas propiedades
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        //seteamos el ataque pero no lo populamos/poblamos con push
        this.ataques = [];
    }
}

//objeto "instancia" hecho con la clase Mokepon. los valores con comillas simples
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
// console.log(hipodoge);

//objeto literal, solo para guardar informacion
hipodoge.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" }
);

capipepo.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
);

//con push inyecto/empujo valores en la variable
mokepones.push(hipodoge, capipepo, ratigueya);

//testeo el array  mokepones
// console.log(mokepones);

function iniciarJuego() {
    seccionSeleccionarAtaque.style.display = "none";
    seccionReiniciar.style.display = "none";
    //poblar el html
    mokepones.forEach((mokepon) => {
        //x ej
        //console.log(mokepon);
        // console.log(mokepon.nombre);

        //template literals, con la variable vacia que creamos arriba
        opcionDeMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjetas-mokepon" for=${mokepon.nombre}>
                    <img
                        src=${mokepon.foto}
                        alt="${mokepon.nombre}"
                    />
                    <p>${mokepon.nombre}</p></label
                >`;
        //va el += en lugar de solo = porque son mas de 1 objeto
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById("Hipodoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");
    });

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
    seccionSeleccionarAtaque.style.display = "flex";
    seccionSeleccionarMascota.style.display = "none";

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
    } else {
        alert("Selecciona una mascota");
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }

    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="BAtaque">${ataque.nombre}</button>`;
        contenedorAtaques.innerHTML += ataquesMokepon;
    });
    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO");
                console.log(ataqueJugador);
                boton.style.opacity = 0.5;
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA");
                console.log(ataqueJugador);
                boton.style.opacity = 0.5;
            } else {
                ataqueJugador.push("TIERRA");
                console.log(ataqueJugador);
                boton.style.opacity = 0.5;
            }
            ataqueAleatorioEnemigo();
        }); //FOREACH
    });
}

function seleccionarMascotaEnemigo() {
    //-1 porque si no toam el primer nro del rango y sobra uno
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1);

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;
    // imgMascota;
    secuenciaAtaque();
    // mostrarMascotas();
}

// function mostrarMascotas() {
//     let mokeponJugador = `<p>${mokepon.nombre}</p>
//     <img src=${mokepon.foto} alt=${mokepon.nombre}`;
//     divJugador.innerHTML = mokeponJugador;

//     let mokeponEnemigo = `<p>${mokepon.nombre}</p>
//     <img src=${mokepon.foto} alt=${mokepon.nombre}`;
//     divEnemigo.innerHTML = mokeponEnemigo;
// }

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function crearMensaje(resultado) {
    let notificacion = document.createElement("p");
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo;

    sectionMensajes.appendChild(notificacion);
    divJugador.appendChild(nuevoAtaqueJugador);
    divEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje("Empate");
        } else if (
            (ataqueJugador[index] == "FUEGO" &&
                ataqueEnemigo[index] == "TIERRA") ||
            (ataqueJugador[index] == "AGUA" &&
                ataqueEnemigo[index] == "FUEGO") ||
            (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA")
        ) {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    // if (ataqueEnemigo == ataqueJugador) {
    //     crearMensaje("EMPATE");
    // } else if (
    //     (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
    //     (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
    //     (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")
    // ) {
    //     crearMensaje("GANASTE");
    //     vidasEnemigo--;
    //     spanVidasEnemigo.innerHTML = vidasEnemigo;
    // } else {
    //     crearMensaje("PERDISTE");
    //     vidasJugador--;
    //     spanVidasJugador.innerHTML = vidasJugador;
    // }

    revisarVictorias();
}

function revisarVictorias() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate! :S");
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones, Ganaste! :)");
    } else {
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
