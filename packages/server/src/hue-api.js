// Abstracts node-hue-api
const { v3 } = require('node-hue-api')

class HueAPI {
  async connect (ipaddress, username) {
    return v3.api.createLocal(ipaddress).connect(username)
  }

  async search (useUPnP = true, timeout = 2000) {
    return useUPnP ? v3.discovery.upnpSearch(timeout) : v3.discovery.nupnpSearch()
  }
}

module.exports = HueAPI
