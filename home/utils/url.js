const base_url = 'http://localhost:8000/'

const inquire = base_url+'api/v1/user/inquire'
const login = base_url + 'api/v1/user/login'
const register = base_url + 'api/v1/user/register'

const leopardCreate = base_url + 'api/v1/leopard/create'
const retrieve = base_url + 'api/v1/leopard/retrieve'
const baseGeneLoad = base_url + 'api/v1/leopard/basegene'

module.exports = {
  inquire: inquire,
  login: login,
  register: register,
  leopardCreate: leopardCreate,
  retrieve: retrieve,
  baseGeneLoad: baseGeneLoad,
}