 
const express = require('express');   
const app = express();  

// // Se define la ruta products  
app.get('/api/products', (req, res) => {  
    res.send('¡products!');  
});  

// Se define la ruta carts 
app.get('/api/carts', (req, res) => {  
    res.send('¡carts!');  
});  

// puerto en el que escuchará el servidor  
const PORT = process.env.PORT || 8080;  

// Inicia el servidor  
app.listen(PORT, () => {  
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  
});