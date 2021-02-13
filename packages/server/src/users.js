const { gql } = require('apollo-server')
const { v3 } = require('node-hue-api')
const connect = require('./connect')

const appName = 'hue-controller'
const deviceName = 'hue-controller-device'

const CreateUser = async function (_, { ipaddress }) {
  const unauthenticatedApi = await v3.api.createLocal(ipaddress).connect()
  let createdUser
  try {
    createdUser = await unauthenticatedApi.users.createUser(appName, deviceName)
  } catch (err) {
    if (err.getHueErrorType() === 101) {
      throw new Error('The Link button on the bridge was not pressed. Please press the Link button and try again.')
    }
    throw err
  }
  return createdUser
}

const typeDefs = gql`
  scalar DateTime

  type User {
    username: String
    name: String
    clientkey: String
    createDate: DateTime
    lastUseDate: DateTime
  }

  extend type Query {
    GetUsers(ipaddress: String!, username: String!): [User]
  }

  extend type Mutation {
    CreateUser(ipaddress: String!): User
  }
`
module.exports = {
  typeDefs,
  resolvers: {
    Query: {
      GetUsers: async function (_, { ipaddress, username }) {
        const api = await connect(ipaddress, username)
        return (await api.users.getAll()).map(user => ({
          name: user.name,
          username: user.username,
          createDate: new Date(user['create date']),
          lastUseDate: new Date(user['last use date'])
        }))
      }
    },
    Mutation: {
      CreateUser
    }
  }
}
