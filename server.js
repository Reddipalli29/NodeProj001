const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>
    {
        res.send(`Hello World! ${port}`)

    })

app.get('/appname',(req,res)=>{
    res.send(`This app name : NODEPROJ001`)
})    

app.get('/product', (req, res)=>{

    res.send(`This is product api on port ${port} , product details to be added `)
})

app.get('/naresh',(req,res)=>{
    res.send(`this is Naresh API on port ${port}`)

})

app.get('/products',async(req,res)=>{

    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(error)
    {
        res.status(500).json({message: error.message})
    }

})

app.get('/products/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch(error)
    {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        } 
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error)
    {
        res.status(500).json({message: error.message})

    }
})

app.post('/products', async(req,res)=>{
   try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

   }catch(error){
        res.status(500).json({message: error.message})
   }
})

//delete a product
app.delete('/products/:id',async(req,res)=>{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).jsob({message: `cannot find any product wiht ID ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})

    }
})


mongoose.connect('mongodb+srv://nareshreddipa:123456admin@nodejsprojectapi.roe5e.mongodb.net/')
.then(()=>{
    app.listen(port,()=>{   
    })
}).catch((error)=>{
    console.error('Error connecting to mongo DB',error)
})



