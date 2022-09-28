// console.log("hola node");

/*3 cosas que con lo minimo necesario par autilizar express*/

//a) importar la libreria - con requiere podemos usar lo que instalamos con npm. ya esta importada destro de mi proyecto
// puedo crear una aplicacion que vaa representar a nuestro servidor
const express = require("express");
const cors = require("cors");

//b)crea/almacena nuestra aplicacion. instancia del servidor que voy a estar utilizando
const app = express();

//decirle a express que use cors
app.use(cors());
//como vamos a trabajar con peticiones tipo POST pare recibir datos de los users, activar peticiones que soporten json como parte de su juego. json y cors son funciones, por eso el ()
app.use(express.json());

//e)lista (vacia) de jugadores que se vayan ir uniendo al servidor
const jugadores = [];

//f)//crear una clase
class Jugador {
    //en su constructor va a recibir un id
    constructor(id) {
        this.id = id;
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

//d)url, metodo. primero "/", desp cambio el endpoint a "/unirse"
app.get("/unirse", (req, res) => {
    //hay librerias para usar en vez de math
    const id = `${Math.random()}`;

    const jugador = new Jugador(id);

    //agregarlo a la lista de jug
    jugadores.push(jugador);

    //cabecera donde permitimos que haga llamadas sarasa. * tipo comodin (inseguro). Lo borro porque no es suficiente. hay que instalar la libreria CORS  8npm install cors)
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id);
    //res.send("hola");
    //cada vez que se agregue un jugados, elo frontend llama a un servicio del backend para que + el nro de jugadores, que se registre ese jug y le devuelva su id
});

//creamos un nuevo servicio (aparte de unirse). Buena practica usar un servicio diferente para cada cosa. Los ":" son la forma de poner una variable  en express
app.post("/mokepon/:jugadorId", (req, res) => {
    //accedo a la variable que se envio en la url
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.mokepon || "";
    const mokepon = new Mokepon(nombre);

    const jugadorIndex = jugadores.findIndex(
        (jugador) => jugadorId === jugador.id
    );

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon);
    }

    console.log(jugadores);
    console.log(jugadorId);
    res.end();
});

//actualizar la posicion del jugador en el mapa
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex(
        (jugador) => jugadorId === jugador.id
    );

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);
    //en express solo puedes devolver json, no una lista. devolvemos un json que contenga esta lista
    res.send({
        enemigos,
    });
});

//que escuche las peticiones de nuestros clientes por medio de un puerto. listen nos permite agregar la capacidad de iniciar el servidor
//c)necesita minimo un callback y el puerto que vamos a utilizar para que sirva la respuesta
app.listen(8080, () => {
    console.log("el servidor funcionando");
});
/* fin de las minimas 3 cosas*/
/*ctrl c para apagar el servidor. Apagarlo para hacer las cosas/editarlo*/
