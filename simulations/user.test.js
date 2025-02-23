import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json';
import User from '../request/user.request';
import Produto from '../request/produto.request';
import Cliente from '../request/clientes.resquest';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']
  }
}

export default function () {

  let login = new Login()
  let user = new User()
  let produto = new Produto()
  let cliente = new Cliente()

  group('login and get token', () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass)
  })

  group('list users', () => {
    user.list(login.getToken())
  })

  group('list produto', () => {
    produto.list(login.getToken())
  })

  group('list cliente', () => {
    cliente.list(login.getToken())
  })
}
