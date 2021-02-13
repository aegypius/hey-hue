const { v3 } = require('node-hue-api')

module.exports = async function connect (ipaddress, username) {
  return v3.api.createLocal(ipaddress).connect(username)
}
