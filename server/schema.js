const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Date

  type Query {
    getHitters: Hitters,
    getPitchers: Pitchers,
  }

  type Hitters {
    id: ID!,
    firstname: String!,
    lastname: String!,
    fullname: String,
    position: String!,
    team: String!,
    scouting_report: String!,
    scouting_future_value: Int!,
    getTools: [Tools]
  }

  type Tools {
    id: ID!,
    hitter_id: ID!,
    name: String,
    grade: Int,
  }

  type Pitchers {
    id: ID,
    firstname: String!,
    lastname: String!,
    fullname: String,
    position: String!,
    team: String!,
    scouting_report: String!,
    scouting_future_value: Int!,
    getPitches: [Pitches],
  }

  type Pitches {
    id: ID!,
    pitcher_id: ID!,
    pitch_name: String!,
    grade: String!,
    velocity: String!,
  }

 
  type Mutation {
    addHitters(input: hittersInput): addHittersResponse!
    addPitchers(input: pitchersInupt): addPitchersResponse!
  }

  input hittersInput {
    firstname: String!, 
    lastname: String!, 
    fullname: String, 
    position: String!, 
    team: String!, 
    scouting_report: String!, 
    scouting_future_value: Int!
    scouting_hitter_tools: [tools]
  }

  input tools {
    name: String,
    grade: Int,
  }

  input pitchersInupt {
    firstname: String!, 
    lastname: String!, 
    fullname: String, 
    position: String!, 
    team: String!, 
    scouting_report: String!, 
    scouting_future_value: Int!,
    scouting_pitches: [pitch_types]
  }

  input pitch_types {
    velocity: Float,
    grade: Int,
    pitch_name: String,
  }  

  type addHittersResponse {
    message: String
  }

  type addPitchersResponse {
    message: String
  }

`

