import _ from 'lodash';
import datasheetResolver from './resolvers/datasheet.js';
import datasheetInstanceResolver from './resolvers/datasheetInstance.js';
import caseResolver from './resolvers/case.js';


const resolvers = _.merge(
  datasheetResolver,
  datasheetInstanceResolver,
  caseResolver
)

export default resolvers;