const express = require('express');
const PORT = 3010;

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`));