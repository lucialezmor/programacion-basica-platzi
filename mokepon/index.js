// console.log("hola node");

/*3 cosas que con lo minimo necesario par autilizar express*/

//a) importar la libreria - con requiere podemos usar lo que instalamos con npm. ya esta importada destro de mi proyecto
// puedo crear una aplicacion que vaa representar a nuestro servidor
const express = require("express");

//b)crea/almacena nuestra aplicacion. instancia del servidor que voy a estar utilizando
const app = express();

//e)lista (vacia) de jugadores que se vayan ir uniendo al servidor
const jugadores = [];

//f)//crear una clase
class Jugador {
    //en su constructor va a recibir un id
    constructor(id) {
        this.id = id;
    }
}

//d)url, metodo. primero "/", desp cambio el endpoint a "/unirse"
app.get("/unirse", (req, res) => {
    //hay librerias para usar en vez de math
    const id = `${Math.random()}`;

    const jugador = new Jugador(id);

    //agregarlo a la lista de jug
    jugadores.push(jugador);

    //cabecera donde permitimos que haga llamadas sarasa. * tipo comodin (inseguro)
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id);
    //res.send("hola");
    //cada vez que se agregue un jugados, elo frontend llama a un servicio del backend para que + el nro de jugadores, que se registre ese jug y le devuelva su id
});

//que escuche las peticiones de nuestros clientes por medio de un puerto. listen nos permite agregar la capacidad de iniciar el servidor
//c)necesita minimo un callback y el puerto que vamos a utilizar para que sirva la respuesta
app.listen(8080, () => {
    console.log("el servidor funcionando");
});
/* fin de las minimas 3 cosas*/
/*ctrl c para apagar el servidor. Apagarlo para hacer las cosas/editarlo*/
