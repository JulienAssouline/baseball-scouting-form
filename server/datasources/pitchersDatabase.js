const { DataSource } = require('apollo-datasource')
const authenticate = require('../authenticate')

class PitcherDatabase extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {
    this.context = config.context
  }

  async getPitchers(input){
      const { postgres} = this.context 
 
      const getPitchers = {
        text: "SELECT id, firstname, lastname, fullname, position, team, scouting_report, scouting_future_value FROM bluejaysscouting.pitchers",
      }

      const result = await postgres.query(getPitchers)

      return result.rows


  }

  async getPitches(input) {
    const { postgres} = this.context

    const getPitches = {
      text: "SELECT id, pitcher_id, pitch_name, grade, velocity FROM bluejaysscouting.scouting_pitches",
    }

      const result = await postgres.query(getPitches)

      console.log(result.rows)

      return result.rows

  }

  async addPitchers(input) {
    const { postgres} = this.context

    const { firstname, lastname, fullname, position, team, scouting_report, scouting_future_value, scouting_pitches } = input
    
    const pitcher = {
      text: "INSERT INTO bluejaysscouting.pitchers (firstname, lastname, fullname, position, team, scouting_report, scouting_future_value) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values: [firstname, lastname, fullname, position, team, scouting_report, scouting_future_value]
    }

    const pitcherResult = await postgres.query(pitcher)

    const pitcher_id = pitcherResult.rows[0].id

    scouting_pitches.forEach(async (pitch) => {
        const pitchersPitches = {
            text: "INSERT INTO bluejaysscouting.scouting_pitches (pitcher_id, pitch_name, grade, velocity) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [pitcher_id, pitch.pitch_name, pitch.grade, pitch.velocity]
          }
      const pitchResult =  await postgres.query(pitchersPitches);
     })


    return {
     message: "pitcher & pitches added"
    }

  }


}

module.exports = PitcherDatabase

