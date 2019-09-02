import gql from 'graphql-tag'

export const GET_HITTERS = gql`
  query {
    getHitters {
        id
        firstname
        lastname
        fullname
        position
        team
        scouting_report
        scouting_future_value
        getTools {
            id
            hitter_id
            name
            grade
        }
      }
  }
`
export const GET_PITCHERS = gql`
  query {
    getPitchers {
        id
        firstname
        lastname
        fullname
        position
        team
        scouting_report
        scouting_future_value
        getPitches {
          id
          pitcher_id
          pitch_name
          grade
          velocity
        }
      }
  }
`