import { getAllDatasheets, getDatasheetByDomain, getDatasheetsByVarietyType, getDatasheetById, createDatasheet, addVariations } from '../entities/datasheet.js';
const resolvers = {
  Query: {
    getAllDatasheets: (_, __, { }) => {
      return getAllDatasheets();
    },
    getDatasheetsByDomain: (_, domain, { }) => {
      return getDatasheetByDomain(domain);
    },
    getDatasheetsByVarietyType: (_, varietyType, { }) => {
      return getDatasheetsByVarietyType(varietyType);
    },
    getDatasheetById: (_, idDatasheet, { })=>{
      return getDatasheetById(idDatasheet);
    }
  },
  Mutation: {
    createDatasheet(_, { datasheet, variations }) {
      return createDatasheet(datasheet, variations);
    },
    addVariations(_, { idDatasheet, variations }) {
      return addVariations(idDatasheet, variations);
    },
  }
};

export default resolvers;