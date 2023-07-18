const express = require('express');
const PORT = 3010;

const app = express();
app.use(express.json())

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  res.json({name, email, password});
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`));