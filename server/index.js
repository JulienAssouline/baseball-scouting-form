const express = require('express')
const cookieParser = require('cookie-parser')
const chalk = require('chalk')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const http = require("http")


const postgres = require('./config/postgres')
const typeDefs = require('./schema')
let resolvers = require('./resolvers')

const HitterDatabase = require("./datasources/hitterDatabase")
const PitcherDatabase = require("./datasources/pitchersDatabase")

const app = express()
const PORT = 8080

app.use(cookieParser())

  // Using the cors middleware, the server sets the correct HTTP header enabling cross-origin resource sharing
  const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.set('CORS_CONFIG', corsConfig)

  app.use(cors(corsConfig))

const dataSources = () => ({
  hitterDatabase: new HitterDatabase(),
  pitcherDatabase: new PitcherDatabase()
})

resolvers = resolvers()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const apolloServer = new ApolloServer({
  context: ({ req }) => {
    return {
      app,
      req,
      postgres,
    }
  },
  schema,
  dataSources,
})

apolloServer.applyMiddleware({
  app,
  cors: app.get('CORS_CONFIG'),
})

 let server = app.listen(PORT, () => {
  console.log(`>> ${chalk.blue('Express running:')} http://localhost:${PORT}`)

  console.log(`>> ${chalk.magenta('GraphQL playground:')} http://localhost:${PORT}/graphql`)
})

server.on('error', err => {
  console.log(err)
})
