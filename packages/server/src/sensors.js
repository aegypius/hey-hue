const { gql } = require('apollo-server')
const connect = require('./connect')

const typeDefs = gql`

  type Sensor {
    id: String
    lastupdated: DateTime
    on: Boolean
    reachable: String
    battery: String
    url: String
    name: String
    modelid: String
    manufacturername: String
    uniqueid: String
    swversion: String
    type: String
  }

  extend type Query {
    GetSensors(ipaddress: String!, username: String!): [Sensor]
    GetSensor(ipaddress: String!, username: String!, id: String!): Sensor
  }

  extend type Mutation {
    RenameSensor(ipaddress: String!, username: String!, id: String!, name: String!): Sensor
    DeleteSensor(ipaddress: String!, username: String!, id: String!): Boolean
  }
`

const GetSensors = async function (_, { ipaddress, username }) {
  try {
    const api = await connect(ipaddress, username)

    return api.sensors.getAll()
  } catch (err) {
    console.log(err)
    throw err
  }
}

const GetSensor = async function (_, { ipaddress, username, id }) {
  try {
    const api = await connect(ipaddress, username)

    return api.sensors.getSensor(parseInt(id))
  } catch (err) {
    console.log(err)
    throw err
  }
}

const RenameSensor = async function (_, { ipaddress, username, id, name }) {
  try {
    const api = await connect(ipaddress, username)

    const sensor = api.sensors.getSensor(parseInt(id))
    sensor.name = name

    await api.sensors.renameSensor(sensor)

    return sensor
  } catch (err) {
    console.log(err)
    throw err
  }
}

const DeleteSensor = async function (_, { ipaddress, username, id }) {
  try {
    const api = await connect(ipaddress, username)

    return api.sensors.deleteSensor(parseInt(id))
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  typeDefs,
  resolvers: {
    Query: {
      GetSensors,
      GetSensor
    },
    Mutation: {
      RenameSensor,
      DeleteSensor
    }
  }
}
