const PORT = process.env.PORT || 8080;  

const express = require('express');
const router = express.Router();


router.post('/crear', (req, res) => {
    try {
        const productData = req.body;

        products = [];

        const required = ['title', 'description', 'code', 'price'];
        const missing = required.filter(field => !productData[field]);

        if(missing.length > 0){
            return res.status(400).json({
                status: "error",
                error: "faltan completar campos" 
            })
        }


        const existingProduct = products.find(product => product.code === productData.code);
        if (existingProduct) {
            return res.status(400).json({ error: 'El código del producto ya existe' });
        }

        const newId = products.length > 0 
            ? Math.max(...products.map(product => product.id)) + 1 
            : 1;
        const newProduct = {
            id: newId,
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
        };

        
        products.push(newProduct);

        res.status(201).json({
            status: "success",
            message: "Producto agregado correctamente",
            product: newProduct
        });


    } catch (error) {
        res.status(500).json({ 
            status: "error",
            error: "Error al crear el producto"
        });
    }
});