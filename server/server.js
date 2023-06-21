const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));


//When we decide which project to do:
// require("./routes/blank.routes")(app);
require('./routes/user.routes')(app);

app.listen(8000, () => console.log("Listening on Port 8000"))