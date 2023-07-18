class UsersController {
  create(req, res) {
    const { name, email, password } = req.body;
    res.json({name, email, password});
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