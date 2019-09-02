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