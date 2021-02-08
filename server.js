const express = require('express'); 
const app = express(); 

const PORT = process.env.PORT || 3000; 

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path'); 

app.listen(PORT, () => {

    console.log(`Server is Now Active on Port Number: ${PORT}`);

});

app.use(express.static('public')); 

app.get('/',(req,res)=>{

    res.render('home'); 

})

app.use(expressLayout); 
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs'); 