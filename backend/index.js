const express = require('express');
const dataRoutes = require('./src/routes/dataRoutes');
const app = express();
const cors = require('cors');
app.use(cors());
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//app.use(express.json());//Won't work to capture and reconstruct multipart/form-data
//app.use(express.urlencoded({ extended: false }));//Won't work either
app.use('/api/', dataRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen('4000', 'localhost', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Web application listening at http://%s:%s', host, port);
});
