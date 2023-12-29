// const bodyparser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const { router } = require('./routes/routes')
const mongoose = require('mongoose');
require("dotenv").config();

const express = require('express');
const app = express();


//middleware
//app.use(cookieParser());
//app.use(bodyparser.json());
app.use(express.json())
app.use(cors());

app.use('/', router);

//mongoose connection
mongoose.connect(process.env.Mongodb_uri).then(() => {
    const port = process.env.port;
    app.listen(port, () => {
        console.log("server running on port http://localhost:8080");
    });
});

//type of request and url
// app.use((req, res, next) => {
//     console.log(`Received ${req.method} request for ${req.url}`);
//     next();
// });

// app.get('/', (req, res) => {
//     res.json({ message: "succesful connection" });
// });



