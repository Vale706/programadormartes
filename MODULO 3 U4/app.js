var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session') //Llamo a la libreria


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Codigo de la sesión
app.use(session({
  secret:'asdfghjklasdfghjklasdfghjkl',
  resave:false,
  saveUninitialized: true
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//Codigo de VARIABLE DE SESION

app.get ('/', function(req, res){
  var conocido = Boolean(req.session.nombre);

  res.render('index', {
    title:'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

//Metodo que recibe la info que se cargo en el input
app.post('/ingresar', function(req, res){
if(req.body.nombre){
  //La informacion que obtiene en body la guarda
  // en la vble session nombre
  req.session.nombre = req.body.nombre
}
// Re direcciona al inicio
res.redirect('/');
});

app.get('/salir', function(req, res){
  req.session.destroy();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
