const PORT = process.env.PORT || 8080;  

const express = require('express');
const router = express.Router();


let products = [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
    { id: 3, name: "Producto 3", price: 300 },
    
];


router.get('/', (req, res) => {
    try {
        const limit = req.query.limit;
        
        if (limit && !isNaN(limit)) {
            
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.status(200).json(limitedProducts);
        }
        
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});


router.get('/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        
        
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});

module.exports = router;