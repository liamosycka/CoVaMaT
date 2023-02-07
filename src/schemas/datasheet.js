
import { gql } from 'apollo-server';
const typeDefs = gql`
  type Datasheet {
    _id: ID
    name: String
    domain: Domain
    varietyType: VarietyType
    variationPoint: VariationPoint
    variations: [Variation]
  }

  input InputDatasheet{
    name: String
    domain: InputDomain
    varietyType: InputVarietyType
    variationPoint: InputVariationPoint
    variations: [InputVariation]
  }

  type Query {
    getAllDatasheets: [Datasheet]
    getDatasheetsByDomain(domain: InputDomain): [Datasheet]
    getDatasheetsByVarietyType(varietyType: InputVarietyType): [Datasheet]
    getDatasheetById(idDatasheet: ID): Datasheet
  }
  type Mutation {
    createDatasheet(datasheet: InputDatasheet):ID
    addVariations(idDatasheet: ID, variations: [Variation]): Boolean
  }
`;
export default typeDefs;