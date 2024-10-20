const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbConnect = require('./config/database');
require('dotenv').config();
const routes = require('./routes/routes');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/v1', routes);

dbConnect();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)  
})




