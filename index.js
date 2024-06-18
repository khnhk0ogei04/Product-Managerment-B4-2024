const express = require('express');
require('dotenv').config();
const database = require("./config/database");
const bodyParser = require('body-parser');
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.routes");
const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));
// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
