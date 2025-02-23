const express = require('express');
const hbs = require('hbs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); 
const io = new Server(server); 

// Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Array
let productos = [
{ id: 1, nombre: 'Paracetamol', precio: 5 },
{ id: 2, nombre: 'Ibuprofeno', precio: 8 }
];

// Ruta "home" (estática)
app.get('/', (req, res) => {
res.render('home', { productos });
});

// Ruta "realTimeProducts" (dinámica con WebSockets)
app.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts', { productos });
});

// Manejo de WebSockets con Socket.IO
io.on('connection', (socket) => {
console.log('Usuario conectado');

// Enviar la lista inicial de productos al conectar
socket.emit('updateProducts', productos);

// Escuchar evento para agregar producto
socket.on('addProduct', (producto) => {
const nuevoProducto = {
    id: productos.length + 1,
    nombre: producto.nombre,
    precio: producto.precio
};
productos.push(nuevoProducto);
io.emit('updateProducts', productos); 
});

// Escuchar evento para eliminar producto
socket.on('deleteProduct', (id) => {
productos = productos.filter((p) => p.id !== id);
io.emit('updateProducts', productos); 
});

socket.on('disconnect', () => {
console.log('Cliente desconectado');
});
});

// servidor
const PORT = 3000;
server.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});