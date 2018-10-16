let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
let serviceLocator = require('app/config/dependency_container');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    helpers: require('./public/js/handlebar-helpers'), // same file that gets used on our client
    partialsDir: 'views/partials/', // same as default, I just like to be explicit
    layoutsDir: 'views/layouts/' // same as default, I just like to be explicit
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//flash messages
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

require('app/routes/routes').setup(app, serviceLocator);

app.listen(3001);