let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');

let app = express();
let serviceLocator = require('app/config/dependency_container');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

require('app/routes/routes').setup(app, serviceLocator);

app.listen(3001);