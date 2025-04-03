require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
mongoose.connect(`${process.env.MONGO_URI}/products`)
.then (() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err)
);

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name Required !!!"],
        trim : true
    },
    price: {
        type: Number,
        required: [true, "Product Price Required !!!"],
        min: [0, "Price must be greater than 0"],
    },
    description: {
        type: String,
        trim: true
    },
    category:{
        type: String,
        trim: true
    },
    inStock: {
        type: Boolean,
        default: true,
    }

},{timestamps: true})

const Product = mongoose.model('Product', productSchema);

const PORT = process.env.PORT || 3000;

//Create the product 
app.post('/api/products', async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            success: true,
            message: "new product created",
            data: product
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

//get all products
app.get('/api/products', async (req, res) => {
    try{
        const filters = {};
        if(req.query.category){
            filters.category = req.query.category;
        }

        if(req.query.inStock){
            filters.inStock = req.query.inStock = 'true';
        }

        const products = await Product.find(filters).sort({createdAt : -1});
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })
    }catch (error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})


//get single product by ID
app.get('/api/products/:id', async(req, res) => {
    try{
        const products = await Product.findById(req.params.id);


        if(!products){
            return res.status(404).json({
                success: true,
                error: "product not found"           
            });
        }

        res.status(200).json({
            success: true,
            data: products
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})


//update product by ID
app.put('/api/products/:id', async (req, res)=> {
    try{
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true,
        });
        if(!products){
            return res.status(404).json({
                success: false,
                error: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: products,
            message: "product updated successfully"
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})


//delete product by ID
app.delete('/api/products/:id', async (req, res) => {
    try{
        const products = await Product.findByIdAndDelete(req.params.id);
        if(!products){
            return res.status(404).json({
                success: false,
                error: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: products,
            message: "product deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    
} )

