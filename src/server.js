const express = require('express');
const PORT = 3010;

const app = express();
app.get('/:id', (req, res) => {
  const { id } = req.params
  res.send(`Id da rota: ${id}`);
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`));