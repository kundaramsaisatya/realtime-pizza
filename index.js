const express = require("express");
const app = express();
const PORT = process.env.PORT || 3300;
const path = require("path");

//Assets
app.use(express.static('public'))
//set template engine
app.use(express());
app.set("views",path.resolve('./resources/views'));
app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/cart',(req,res)=>{
    res.render('customers/cart');
})
app.get('/login',(req,res)=>{
    res.render('auth/login');
})
app.get('/register',(req,res)=>{
    res.render('auth/register');
})


app.listen(PORT,()=>console.log(`Server started on: ${PORT}`))
