module.exports = {
  Query: {
    async getHitters(parent, { input }, { dataSources }){
      return await dataSources.hitterDatabase.getHitters(input)
    },
    async getPitchers(parent, { input }, { dataSources }) {
      return await dataSources.pitcherDatabase.getPitchers(input)
    }
  },
  Hitters: {
    async getTools(parent, { input }, { dataSources }){
      return await dataSources.hitterDatabase.getTools(input)
    },
  },
  Pitchers: {
    async getPitches(parent, { input }, { dataSources }){
      return await dataSources.pitcherDatabase.getPitches(input)
    },
  },
}
