const express = require('express')
const axios = require('axios');
var bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.listen(8080,()=>{
    console.log('Server is working')
})

app.set('view engine', 'pug')

app.get('/getAll', (req,res)=>{
    axios.get('https://northwind.vercel.app/api/products').then((product)=>{

        res.render('categoryList',{data :product.data})
    })
})

app.get('/addProducts',(req,res)=>{
    res.render('addProducts')
})
app.get('/deleteProducts',(req,res)=>{
    res.render('deleteProducts')
})
app.get('/updateProducts',(req,res)=>{
    res.render('updateProducts')
})

app.post('/deletecategory', (req,res)=>{
    axios.delete(`https://northwind.vercel.app/api/products/${req.body.id}`);
    res.redirect('/getAll')
    
})
app.post('/addcategory', (req, res) => {

    const webApiUrl = 'https://northwind.vercel.app/api/products';

    axios.post(webApiUrl, {
        name: req.body.name,
        id: req.body.id,
        unitPrice :req.body.unitPrice
    })
        .then(function (response) {
            res.redirect('/getAll')
        })

})
app.post('/updateCategory',async (req,res)=>{
    
    resourceURL ='https://northwind.vercel.app/api/products';
    await axios.put(`${resourceURL}/${req.body.id}`, {name :req.body.name,unitPrice : req.body.unitPrice});
    res.redirect('/getAll')
})

