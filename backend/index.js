const express = require('express');
const dataRoutes = require('./src/routes/dataRoutes');
const app = express();
const cors = require("cors");
app.use(cors());


//app.use(express.json());//Won't work to capture and reconstruct multipart/form-data
//app.use(express.urlencoded({ extended: false }));//Won't work either
app.use('/api/', dataRoutes);

const server = app.listen('4000', '127.0.0.1', function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Web application listening at http://%s:%s', host, port)
});