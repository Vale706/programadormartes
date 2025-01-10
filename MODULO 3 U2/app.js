var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/*Paso 1 de controlador de ruta Contacto*/
var contactoRouter = require('./routes/contacto');
/**Esto quiere decir qye dentro d ela carpeta ROUTES 
 *debo tener un srchivo contacto.js */ 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/contacto', contactoRouter);

/**PRUEBA */
app.get('/prueba', function(req,res,next){
  res.send('PAGINA DE PRUEBA')
});

/**NOSOTROS */
app.get('/nosotros', function(req,res,next){
  res.send('PAGINA DE NOSOTROS')
});

/**DESTACADOS */
app.get('/destacados', function(req,res,next){
  res.send('PAGINA DE DESTACADOS')
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
