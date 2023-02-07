import {getDatasheetInstancesById, getDatasheetsInstances, createDatasheetInstance} from '../entities/datasheetInstance.js';
const resolvers = {
  Query: {
    getDatasheetInstances: (_, __, { }) => {
      return getDatasheetsInstances();
    },
    getDatasheetInstancesById: (_, {ids}, {} ) => {
      return getDatasheetInstancesById(ids);
    }

  },
  Mutation: {
    createDatasheetInstance(_, { datasheetInstance }) {
      return createDatasheetInstance(datasheetInstance);
    }
  }
};

export default resolvers;