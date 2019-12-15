var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

var DB_URL = 'mongodb+srv://hardikshah:user@assignment13-w6slo.mongodb.net/test?retryWrites=true&w=majority';

var Product = mongoose.model('product', {
    product: {
        productId: Number,
        category: String,
        price: String,
        name: String,
        instock: Boolean,
    },
    id : Number
});

mongoose.connect(DB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false}, (error) => {
    if(error != null)
    console.log("MONGO ERROR:", error);
});
// API Routes below
app.get('/product/get/', async (req, res) => {
    var products = {};
    var data = await Product.find({});
    data.forEach((value) => {
        products[value.product.productId] = value.product;
    });
    res.send(products);
});

app.post('/product/create/', async (req, res) => {
    try{
        var product = new Product(req.body);
        await product.save();
        res.sendStatus(200);
    }catch (error) {
        res.sendStatus(500);
    } 
});

app.put('/product/update/:id', async (req, res) => {
    try{
        var requestId = req.params.id;
        console.log(req.body)
        await Product.updateOne({id: requestId}, req.body);
        res.sendStatus(200);   
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/product/delete/:id', async (req, res) => {
    try{
        var requestId = req.params.id;
        console.log("deleting record",requestId)
        await Product.deleteOne({ id:requestId });
        res.sendStatus(200);
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(5000, () => {
    console.log('Server up at port 5000');
});