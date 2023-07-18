const express = require('express');
const PORT = 3010;

const routes = require('./routes')

const app = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`));