const { gql } = require('apollo-server')
const connect = require('./connect')

const typeDefs = gql`
  type Light {
    id: String
    uniqueid: String
    name: String
    type: String
    modelid: String
    productid: String
    swversion: String
    swupdate: SoftwareUpdateState
    state: LightState
    capabilities: LightCapabilities
    colorGamut: ColorGamut
  }

  type SoftwareUpdateState {
    state: String
    lastinstall: String
  }

  enum Effect {
    none
    colorloop
  }

  enum Alert {
    none
    select
    lselect
  }

  type LightState {
    on: Boolean
    bri: Int
    hue: Int
    sat: Int
    effect: Effect
    xy: [Float]
    ct: Int
    colormode: String
    alert: Alert
    mode: String
    reachable: Boolean
  }

  type LightCapabilities {
    certified: Boolean
  }

  type ColorGamut {
    red: Point
    green: Point
    blue: Point
  }

  type Point {
    x: Float
    y: Float
  }

  input LightStateInput {
    on: Boolean
    bri: Int
    ct: Int
    alert: Alert
    effect: Effect
  }

  extend type Query {
    GetLights(ipaddress: String!, username: String!): [Light]
    GetLight(ipaddress: String!, username: String!, id: String!): Light
    GetLightByName(ipaddress: String!, username: String!, name: String!): Light
    GetLightState(ipaddress: String!, username: String!, id: String!): LightState
  }

  extend type Mutation {
    SetLightState(ipaddress: String!, username: String!, id: String!, state: LightStateInput!): LightState
    SwitchOn(ipaddress: String!, username: String!, id: String!): LightState
    SwitchOff(ipaddress: String!, username: String!, id: String!): LightState
    RenameLight(ipaddress: String!, username: String!, id: String!, name: String!): Light
    DeleteLight(ipaddress: String!, username: String!, id: String!): Boolean
  }
`

const GetLights = async function (_, { ipaddress, username }) {
  try {
    const api = await connect(ipaddress, username)

    return api.lights.getAll()
  } catch (err) {
    console.log(err)
    throw err
  }
}

const GetLight = async function (_, { ipaddress, username, id }) {
  try {
    const api = await connect(ipaddress, username)

    return api.lights.getLight(parseInt(id, 10))
  } catch (err) {
    console.log(err)
    throw err
  }
}

const GetLightByName = async function (_, { ipaddress, username, name }) {
  try {
    const api = await connect(ipaddress, username)

    return api.lights.getLightByName(name)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const GetLightState = async function (_, { ipaddress, username, id }) {
  try {
    const api = await connect(ipaddress, username)

    return api.lights.getLightState(id)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const SetLightState = async function (_, { ipaddress, username, id, state }) {
  try {
    const api = await connect(ipaddress, username)

    await api.lights.setLightState(id, state)

    // Return new state
    return api.lights.getLightState(id)
  } catch (err) {
    console.log(err)
    throw err
  }
}

const SwitchOn = async function (_, { ipaddress, username, id }) {
  return SetLightState(_, { ipaddress, username, id, state: { on: true } })
}

const SwitchOff = async function (_, { ipaddress, username, id }) {
  return SetLightState(_, { ipaddress, username, id, state: { on: false } })
}

const RenameLight = async function (_, { ipaddress, username, id, name }) {
  try {
    const api = await connect(ipaddress, username)

    const light = await api.lights.getLight(parseInt(id, 10))
    light.name = name

    api.lights.renameLight(light)

    return light
  } catch (err) {
    console.log(err)
    throw err
  }
}

const DeleteLight = async function (_, { ipaddress, username, id }) {
  try {
    const api = await connect(ipaddress, username)

    return api.lights.deleteLight(parseInt(id, 10))
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  typeDefs,
  resolvers: {
    Query: {
      GetLights,
      GetLight,
      GetLightByName,
      GetLightState
    },
    Mutation: {
      SetLightState,
      SwitchOn,
      SwitchOff,
      RenameLight,
      DeleteLight
    }
  }
}
