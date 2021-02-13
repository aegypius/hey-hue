const { gql } = require('apollo-server')

const DiscoverBridges = async function (_, { useUPnP = false, timeout = 2000 }, { dataSources }) {
  const discoveryResults = await dataSources.hueApi.search(useUPnP, timeout)

  if (discoveryResults.length === 0) {
    throw new Error('Failed to resolve any Hue Bridges')
  } else {
    return discoveryResults
  }
}

const typeDefs = gql`
  type Bridge {
    name: String
    manufacturer: String
    ipaddress: String
    model: Model
    swversion: String
    version: Version
    icons: [Icon]
  }

  type Icon {
    mimetype: String
    height: Int
    width: Int
    depth: Int
    url: String
  }

  type Version {
    major: Int
    minor: Int
  }

  type Model {
    number: String
    description: String
    name: String
    serial: String
  }

  extend type Query {
    DiscoverBridges(useUPnP: Boolean): [Bridge]
  }
`
module.exports = {
  typeDefs,
  resolvers: {
    Query: {
      DiscoverBridges
    },
    Mutation: {
    }
  }
}
