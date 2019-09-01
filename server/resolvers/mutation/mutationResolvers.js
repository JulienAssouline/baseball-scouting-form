module.exports = {
  Mutation: {
    async addHitters(parent, { input }, { dataSources }){
      return await dataSources.hitterDatabase.addHitters(input)
    },
    async addPitchers(parent, { input }, { dataSources }){
      return await dataSources.pitcherDatabase.addPitchers(input)
    },
  },
} 
