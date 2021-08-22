require("dotenv").config()

const express = require('express');

const mongooseConnection = require("./helpers/mongoose-connection");

const app = express();

const router = require('./router');

mongooseConnection()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT, function () {
    console.log('listening on port 5000 ')
})