const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require ('./routes/productRoutes');

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success : false, 
        error : err.message
    })
})

module.exports = app;