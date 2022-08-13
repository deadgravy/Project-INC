const express = require('express');
const dataRoutes = require('./src/routes/dataRoutes');
const eudRoutes = require('./src/routes/eudRoutes');
const app = express();
const cors = require('cors');
app.use(cors());

//app.use(express.json());//Won't work to capture and reconstruct multipart/form-data
//app.use(express.urlencoded({ extended: false }));//Won't work either
app.use('/api/', dataRoutes);
app.use('/api/', eudRoutes);

const server = app.listen('4000', 'localhost', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Web application listening at http://%s:%s', host, port);
});
