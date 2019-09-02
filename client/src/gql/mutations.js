import gql from 'graphql-tag'

export const ADD_HITTERS = gql`
  mutation addHittersMutation($input: hittersInput!) {
    addHitters(input: $input){
        message
    }
  }
`;

export const ADD_PITCHERS = gql`
  mutation addPitchersMutation($input: pitchersInput!) {
    addPitchers(input: $input){
        message
    }
  }
`;