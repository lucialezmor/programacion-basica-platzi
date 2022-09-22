// console.log("hola node");

/*3 cosas que con lo minimo necesario par autilizar express*/

//a) importar la libreria - con requiere podemos usar lo que instalamos con npm. ya esta importada destro de mi proyecto
// puedo crear una aplicacion que vaa representar a nuestro servidor
const express = require("express");

//b)crea/almacena nuestra aplicacion. instancia del servidor que voy a estar utilizando
const app = express();

//url, metodo
app.get("/", (req, res) => {
    res.send("hola");
});

//que escuche las peticiones de nuestros clientes por medio de un puerto. listen nos permite agregar la capacidad de iniciar el servidor
//c)necesita minimo un callback y el puerto que vamos a utilizar para que sirva la respuesta
app.listen(8080, () => {
    console.log("el servidor funcionando");
});
/* fin de las minimas 3 cosas*/
/*ctrl c para apagar el servidor*/
