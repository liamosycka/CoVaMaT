import { ObjectId } from 'mongodb';
import client from '../config/db.js';
import _ from 'lodash';
import { getDatasheetInstancesByIdAndContextType } from './datasheetInstance.js'


const map = (obj) => {
  const studyCase = {
    _id: obj._id,
    name: obj.name,
    domain: obj.domain,
    variety: obj.variety
  };
  return studyCase;
}

export const getCases = async () => {
  await client.connect();
  const result = client.db("covamatDB").collection("case").find()
  let cases = [];
  while (await result.hasNext()) {
    cases.push(await result.next())
  }
  client.close();
  return cases;

}

export const getCasesSimilarToReuseCase = async (reuseCase) => {
  const reuseCaseContext = reuseCase['reuseCase']['context'];
  await client.connect();
  //get cases with the same domain as reuse case
  const result = client.db("covamatDB").collection("case").find({ domain: { name: reuseCase['reuseCase']['domain']['name'] } })
  var similarCases = [];
  while (await result.hasNext()) {
    //for each case we have to check whether the reuse case context
    //is equals to the context of the case
    const actualCase = await result.next();
    //get the array of ids of ds instances
    let datasheetInstancesIds = actualCase['variety'];
    //get the context ds instances of the case
    const caseContextVariety = await getDatasheetInstancesByIdAndContextType(datasheetInstancesIds);
    if (caseContextVariety.length > 0) {
      // we have to check if every context variety of the case appeears in the
      //context of the reuse case
      var i = 0;
      //variable to break the loop if the case we are looking into
      //has a context variety that the reuse case doesn't
      var matches = true;
      while (i < caseContextVariety.length && matches) {
        //extract the variation point and variations in an object
        //to check exact appearence in the reuse case context array
        const variationPointAndVariations = {
          variationPoint: caseContextVariety[i]['variationPoint'],
          variations: caseContextVariety[i]['variations']
        };
        //findIndex checks if the extracted object appears in the context array of reuseObject
        //returns the index if exists, -1 otherwise
        if (_.findIndex(reuseCaseContext, variationPointAndVariations) == -1) {
          //this context variety of the case is not present in the context array of reuse object.
          matches = false;
        }
        i++;
      }
      if (matches) {
        //all of the case variety matched with the reuse case
        similarCases.push(actualCase)
      }
    }
  }
  client.close();
  return similarCases;
}


export const createCase = async (inputCase) => {
  await client.connect();
  const idCase = await (await client.db("covamatDB")
    .collection("case").insertOne(inputCase)).insertedId;
  client.close();
  return idCase;
}
