const { hash } = require('bcryptjs')
const AppError = require("../utils/AppError");

const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqliteConnection();
    const userExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if(userExists) {
      throw new AppError('Este e-mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

}

module.exports = UsersController;

/**
 * Um controller pode ter 1 a 5 métodos, mais que isso é recomendável criar outro controller
 * por exemplo pode ter:
 * index - GET para listar vários registros.
 * show - GET para exibir um registro específico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para deletar um registro.
 */