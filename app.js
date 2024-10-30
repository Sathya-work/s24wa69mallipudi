var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mydataRouter = require('./routes/mydata');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use('/mydata', mydataRouter);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/computation', (req, res) => {
  const mathFunction = Math.sqrt;
  let randomValue = Math.floor(Math.random() * 101);

  if (req.query.x) {
      const xValue = parseFloat(req.query.x);
      if (!isNaN(xValue)) {
          randomValue = xValue;
      }
  }

  const result = mathFunction(randomValue);
  
  const responseMessage = `${mathFunction.name} applied to ${randomValue} is ${result}`;
  
  res.send(responseMessage);
})

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
