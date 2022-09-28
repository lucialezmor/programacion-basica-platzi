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

const sectionVerMapa = document.getElementById("ver-mapa");

const mapa = document.getElementById("mapa");

//array Mokepones (vacia ;) )
let jugadorId = null;
let mokepones = [];
let mokeponesEnemigos = [];

let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
//las pego despues de la opcion de pokemones, xq antes no fueron creadas
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let mascotaJugador;
let mascotaEnemigo;
let mascotaJugadorObjeto;

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

let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "assets/mokemap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * (600 / 800);

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

// clase, va con mayuscula, es el "plano" para el objeto (el personaje en este caso). Con constructor. Es escalable, se le pueden agregar mas propiedades
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        //seteamos el ataque pero no lo populamos/poblamos con push
        this.ataques = [];
        this.ancho = 40;
        this.alto = 40;
        this.x = aleatorio(0, mapa.width - this.ancho); //aleatorio(0,320)
        this.y = aleatorio(0, mapa.height - this.alto); //aleatorio(0,240)

        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
}

//objeto "instancia" hecho con la clase Mokepon. los valores con comillas simples
let hipodoge = new Mokepon(
    "Hipodoge",
    "assets/mokepons_mokepon_hipodoge_attack.png",
    5,
    "assets/hipodoge.png"
);
let capipepo = new Mokepon(
    "Capipepo",
    "assets/mokepons_mokepon_capipepo_attack.png",
    5,
    "assets/capipepo.png"
);
let ratigueya = new Mokepon(
    "Ratigueya",
    "assets/mokepons_mokepon_ratigueya_attack.png",
    5,
    "assets/ratigueya.png"
);

//para probar objeto
// console.log(hipodoge);

//objeto literal, solo para guardar informacion

const hipodoge_ataques = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" },
];
hipodoge.ataques.push(...hipodoge_ataques);

// hipodogeEnemigo.ataques.push(...hipodoge_ataques);

const capipepo_ataques = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
];

capipepo.ataques.push(...capipepo_ataques);

// capipepoEnemigo.ataques.push(...capipepo_ataques);

const ratigueya_ataques = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
];
ratigueya.ataques.push(...ratigueya_ataques);
// ratigueyaEnemigo.ataques.push(...ratigueya_ataques);

//con push inyecto/empujo valores en la variable
mokepones.push(hipodoge, capipepo, ratigueya);

//testeo el array  mokepones
// console.log(mokepones);

function iniciarJuego() {
    seccionSeleccionarAtaque.style.display = "none";
    seccionReiniciar.style.display = "none";
    sectionVerMapa.style.display = "none";
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
    unirseAlJuego();
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse").then(function (res) {
        console.log(res);
        if (res.ok) {
            res.text().then(function (respuesta) {
                console.log(respuesta);
                jugadorId = respuesta;
            });
        }
    });
}

function seleccionarMascotaJugador() {
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

    seleccionarMokepon(mascotaJugador);
    extraerAtaques(mascotaJugador);
    sectionVerMapa.style.display = "flex";
    iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mokepon: mascotaJugador,
        }),
    });
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
                // console.log(ataqueJugador);
                boton.disabled = true;
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA");
                // console.log(ataqueJugador);
                boton.disabled = true;
            } else {
                ataqueJugador.push("TIERRA");
                // console.log(ataqueJugador);
                boton.disabled = true;
            }
            ataqueAleatorioEnemigo();
        });
    });
}
//agregado el param enemigo si no es aleatorio
function seleccionarMascotaEnemigo(enemigo) {
    //-1 porque si no toam el primer nro del rango y sobra uno
    // let mascotaAleatoria = aleatorio(0, mokepones.length - 1);
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    //esto va pero es aleatorio
    // spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre;
    // ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques;

    secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
    // console.log("ataques enemigo", ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO");
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA");
    } else {
        ataqueEnemigo.push("TIERRA");
    }
    // console.log(ataqueEnemigo);
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

    seccionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
    mascotaJugadorObjeto.x =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    //cleanrect limpia parte del canvas, hay que indicarle que parte del canvas limpiar
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
    mascotaJugadorObjeto.pintarMokepon();

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon();
    });

    if (
        mascotaJugadorObjeto.velocidadX !== 0 ||
        mascotaJugadorObjeto.velocidadY !== 0
    ) {
        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);
    }
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            x,
            y,
        }),
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemigos }) {
                console.log(enemigos);

                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null;
                    const mokeponNombre = enemigo.mokepon.nombre || "";
                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon(
                            "Hipodoge",
                            "assets/mokepons_mokepon_hipodoge_attack.png",
                            5,
                            "assets/hipodoge.png"
                        );
                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon(
                            "Capipepo",
                            "assets/mokepons_mokepon_capipepo_attack.png",
                            5,
                            "assets/capipepo.png"
                        );
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon(
                            "Ratigueya",
                            "assets/mokepons_mokepon_ratigueya_attack.png",
                            5,
                            "assets/ratigueya.png"
                        );
                    }

                    mokeponEnemigo.x = enemigo.x;
                    mokeponEnemigo.y = enemigo.y;
                    return mokeponEnemigo;
                });
            });
        }
    });
}

function moveUp() {
    //actualizar la posicion de "x" del personaje
    mascotaJugadorObjeto.velocidadY = -5;
    pintarCanvas();
}
function moveRight() {
    //actualizar la posicion de "x" del personaje
    mascotaJugadorObjeto.velocidadX = +5;
    pintarCanvas();
}
function moveDown() {
    //actualizar la posicion de "x" del personaje
    mascotaJugadorObjeto.velocidadY = +5;
    pintarCanvas();
}
function moveLeft() {
    //actualizar la posicion de "x" del personaje
    mascotaJugadorObjeto.velocidadX = -5;
    pintarCanvas();
}

//otra opcion con switch/case

// const controls = document.querySelectorAll('.button-control')

// controls.forEach((control)=>{
//   control.addEventListener('click',()=>moverPersonaje(control.id))
// })

// function moverPersonaje(direction) {

//   switch(direction){
//     case 'up':
//       mascotaJugadorObjeto.y = mascotaJugadorObjeto.y - 5
//       break;
//     case 'left':
//       mascotaJugadorObjeto.x = mascotaJugadorObjeto.x - 5
//       break;
//     case 'down':
//       mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + 5
//       break;
//     case 'right':
//       mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + 5
//       break;
//   }

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
    // console.log(event.key);
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;

        case "w":
            moveUp();
            break;
        case "d":
            moveRight();
            break;
        case "s":
            moveDown();
            break;
        case "a":
            moveLeft();
            break;

        default:
            break;
    }
}

function iniciarMapa() {
    // mapa.width = 320;
    // mapa.height = 240;
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    // console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);

    //(x, y, ancho, alto)
    // lienzo.fillRect(5, 15, 20, 40);

    window.addEventListener("keydown", sePresionoUnaTecla);
    window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    detenerMovimiento();
    clearInterval(intervalo);
    seccionSeleccionarAtaque.style.display = "flex";
    sectionVerMapa.style.display = "none";
    seleccionarMascotaEnemigo(enemigo);
    // alert("hay colision con " + enemigo.nombre);
}

window.addEventListener("load", iniciarJuego);
