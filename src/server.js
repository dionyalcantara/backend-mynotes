require('express-async-errors');
const migrationsRun = require('./database/sqlite/migrations');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');

const cors = require('cors');
const express = require('express');
const PORT = 3010;

const routes = require('./routes');

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, req, res, _next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
})

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`));