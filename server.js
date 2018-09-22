let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');

let app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

require('app/routes/routes').setup(app);

app.listen(3001);