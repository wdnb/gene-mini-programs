var appid = ""
var secret = ""
var tmp = {}


function getOpen() {
  return tmp = {
    "appid": appid,
    "secret": secret,
  }
}


module.exports = {
  getOpen: getOpen
}
