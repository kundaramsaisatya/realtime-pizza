require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3300;
const path = require("path");
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const mongoose = require("mongoose");

// DB connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url)
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
const connection = mongoose.connection;

// Session Store
let mongoStore = MongoDbStore.create({
    client: connection.getClient(),
    collectionName: 'sessions'
});

// Session Config
app.use(session({
    secret: 'superman',
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(flash());

//GLobal Middleware:
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})

// Assets
app.use(express.static('public'));
app.use(express.json());

// Set template engine
app.use(express.urlencoded({ extended: true }));
app.set("views", path.resolve('./resources/views'));
app.set("view engine", "ejs");

// Routes
require('./routes/web')(app);

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
