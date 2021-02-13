const { ApolloServer, gql } = require('apollo-server')
const HueAPI = require('./hue-api')
const Users = require('./users')
const Bridges = require('./bridges')
const Lights = require('./lights')
const Sensors = require('./sensors')

const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`
module.exports = new ApolloServer({
  dataSources: () => {
    return {
      hueApi: new HueAPI()
    }
  },
  typeDefs: [
    typeDefs,
    Users.typeDefs,
    Bridges.typeDefs,
    Lights.typeDefs,
    Sensors.typeDefs
  ],
  resolvers: {
    Query: {
      ...Users.resolvers.Query,
      ...Bridges.resolvers.Query,
      ...Lights.resolvers.Query,
      ...Sensors.resolvers.Query
    },
    Mutation: {
      ...Users.resolvers.Mutation,
      ...Bridges.resolvers.Mutation,
      ...Lights.resolvers.Mutation,
      ...Sensors.resolvers.Mutation
    }
  }
})
