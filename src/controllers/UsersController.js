const { hash, compare } = require('bcryptjs')
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

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [user_id]);

    if(!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    console.log(user)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está em uso.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para mudar a senha.');
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    try {
      await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, user_id]
      );
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar atualizar seus dados')
    }

    return res.json();
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