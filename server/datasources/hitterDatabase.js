const { DataSource } = require('apollo-datasource')
const authenticate = require('../authenticate')

class HitterDatabase extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {
    this.context = config.context
  }

  async getHitters(input){
      const { postgres} = this.context
 
      const getHitters = {
        text: "SELECT id, firstname, lastname, fullname, position, team, scouting_report, scouting_future_value FROM bluejaysscouting.hitters",
      }

      const result = await postgres.query(getHitters)

      return result.rows


  }

  async getTools(parent){
    const { postgres} = this.context
    console.log(parent)


    const tools = {
      text: "SELECT id, hitter_id, name, grade FROM bluejaysscouting.scouting_hitter_tools WHERE hitter_id = $1",
      values: [parent.id]
    }

      const result = await postgres.query(tools)

      return result.rows


}

  async addHitters(input) { 
    const { app, req, postgres} = this.context
    const { firstname, lastname, fullname, position, team, scouting_report, scouting_future_value, scouting_hitter_tools } = input
    
    const hitters = {
      text: "INSERT INTO bluejaysscouting.hitters (firstname, lastname, fullname, position, team, scouting_report, scouting_future_value) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values: [firstname, lastname, fullname, position, team, scouting_report, scouting_future_value]
    }

    const hitterResult = await postgres.query(hitters)

    const hitter_id = hitterResult.rows[0].id

    scouting_hitter_tools.forEach(async (tool) => {
        const pitchersPitches = {
            text: "INSERT INTO bluejaysscouting.scouting_hitter_tools (hitter_id, name, grade) VALUES ($1, $2, $3) RETURNING *",
            values: [hitter_id, tool.name, tool.grade]
          }
      const toolResult =  await postgres.query(pitchersPitches);
     })



    return {
     message: "hitter & tool added"
    }

  }


}

module.exports = HitterDatabase

