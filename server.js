require('dotenv').config()

const express = require('express'); 
const app = express(); 

const PORT = process.env.PORT || 3000; 

const mongoose = require('mongoose'); 

const session  = require('express-session');

const flash = require('express-flash'); 

const MongoDbStore = require('connect-mongo')(session) 


//Database Connection 

const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true});

const connection = mongoose.connection; 
connection.once('open', ()=>{

console.log('Database Successfully Connected!')

}).catch(err =>{

console.log('Connection Failed!') 
}); 

//Session Store 

let mongoStore = new MongoDbStore({

                mongooseConnection: connection, 
                collection: 'sessions'

            }) 

//Session Config - Acts as Middleware

app.use(session({

    secret: process.env.COOKIE_SECRET, 
    resave: false, 
    store: mongoStore, 
    saveUninitialized: false,  
    cookie: { maxAge: 1000 * 60 * 60 * 24}

}));

app.use(flash()); 

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path'); 

app.listen(PORT, () => {

    console.log(`Server is Now Active on Port Number: ${PORT}`);

});

app.use(express.static('public')); 
app.use(express.json()); 


//Global Middleware 

app.use((req,res,next) => {

    res.locals.session = req.session
    next ()

})


//Set Template Engine

app.use(expressLayout); 
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs'); 

require('./routes/web') (app)

