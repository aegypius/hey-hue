const { setWorldConstructor } = require('@cucumber/cucumber')
const { ApolloServer } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const { config } = require('../../src/server')
const HueAPI = require('../../src/hue-api')

class HeyHueWorld {
  constructor () {
    this.hueApi = new HueAPI()
    const server = new ApolloServer({
      ...config,
      // Mocks datasource to avoid requiring a working Hue bridge
      dataSources: () => {
        return {
          hueApi: this.hueApi
        }
      }
    })

    this.api = createTestClient(server)
    this.queryResult = null
  }

  setQueryResult (queryResult) {
    this.queryResult = queryResult
  }
}

setWorldConstructor(HeyHueWorld)
