let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');

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

app.use(express.static(path.join(__dirname, 'public')));

require('app/routes/routes').setup(app, serviceLocator);

app.listen(3001);