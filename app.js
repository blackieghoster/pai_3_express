var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello'); // nasz router
var aboutRouter = require('./routes/about'); // nasz router

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter); // mapowanie sciezki na router
app.use('/about', aboutRouter); // mapowanie sciezki na router

app.get('/hello/:user', (req, res) => {
    let user = req.params["user"];
    res.send(`Witaj ${user.charAt(0).toUpperCase() + user.slice(1)}!`);
})

app.get('/hello', (req, res) => {
    let name = req.query['name'];
    res.send(`Witaj ${name.charAt(0).toUpperCase() + name.slice(1)}!`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


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
