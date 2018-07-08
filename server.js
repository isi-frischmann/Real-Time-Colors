const path = require('path');

// express
var express = require('express');
var app = express();

// bodyparser - to redirect user information
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// static files
app.use(express.static( path.join(__dirname, "./static") ));

// server
var port = 5000;
const server = app.listen(port)

// session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

// install socket
const io = require('socket.io')(server);

// create a color verable 
var colorGeneral = 'pink';
io.on('connection', function(socket){

    // update background to green when button is clicked
    socket.on('changeGreen', function(){
        colorGeneral = 'green';
        io.emit('updateAll', { colorGeneral : colorGeneral});
    })

    // listen BLUE
    socket.on('changeBlue', function(){
        colorGeneral = 'blue';
        io.emit('updateAll', {colorGeneral : colorGeneral});
    })
    

    // LISTEN yellow
    socket.on('changeYellow', function(){
        colorGeneral = 'yellow';
        io.emit('updateAll', {colorGeneral : colorGeneral});
    })
})


// create routing
app.get('/', function(req, res){
    res.render('index');
})