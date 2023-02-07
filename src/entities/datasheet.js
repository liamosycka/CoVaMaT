import { ObjectId } from 'mongodb';
import client from '../config/db.js';

const map = (obj) => {
  const variations = []
  if (obj.variations !== undefined) {
    obj.variations.forEach((variation) => {
      if (variation.variables !== undefined) {
        let variables = []
        variation.variables.forEach((variationVariable) => {
          //complex variable that has the pair (var, value array)
          if (variationVariable.valueArray !== undefined) {
            let variablesArrays = []
            variationVariable.valueArray.forEach((valueArrayVariable) => {
              variablesArrays.push({
                var: valueArrayVariable.var
                , value: valueArrayVariable.value
              })
            })
            //simple variable that has the pair (var, value)
            variables.push({ var: variationVariable.var, valueArray: variablesArrays })
          } else {
            variables.push({ var: variationVariable.var, value: variationVariable.value })
          }
        })

        variations.push({ name: variation.name, variables: variables })
      }
    });
  }
  const datasheet = {
    _id: obj._id,
    name: obj.name,
    domain: obj.domain,
    type: obj.type,
    variation_point: obj.variation_point,
    variations: variations
  };
  return datasheet;
}



export const getAllDatasheets = async () => {
  await client.connect();
  const result = client.db("covamatDB").collection("datasheet").find()
  let datasheets = [];
  while (await result.hasNext()) {
    datasheets.push(await result.next())
  }
  client.close();
  return datasheets;
}

export const getDatasheetByDomain = async (domain) => {
  await client.connect();
  const result = client.db("covamatDB").collection("datasheet")
    .find({ domain: { name: domain.domain.name } })
  let datasheets = [];
  while (await result.hasNext()) {
    datasheets.push(await result.next())
  }
  client.close()
  return datasheets;
}

export const getDatasheetsByVarietyType = async (varietyType) => {
  await client.connect();
  const result = client.db("covamatDB").collection("datasheet")
    .find({ varietyType: { name: varietyType.varietyType.name } })
  let datasheets = [];
  while (await result.hasNext()) {
    datasheets.push(await result.next())
  }
  client.close()
  return datasheets;
}

export const getDatasheetById = async (id) => {
  await client.connect();
  const result = await client.db("covamatDB").collection("datasheet")
    .findOne({ _id: ObjectId(id.idDatasheet) });
  client.close();
  return result;
}

export const createDatasheet = async (datasheet) => {
  await client.connect();
  const idDatasheet = await (await client.db("covamatDB").collection("datasheet").insertOne(datasheet)).insertedId;
  client.close();
  return idDatasheet;

}

export const addVariations = async (idDatasheet, variations) => {
  await client.connect();
  //get datasheet
  const datasheet = await client.db("covamatDB").collection("datasheet")
    .findOne({ "_id": ObjectId(idDatasheet) });
  //add variations
  let dsVariations = datasheet.variations || [];
  variations.forEach((variation) => {
    dsVariations.push(variation);
  })
  //update datasheet
  await client.db("covamatDB").collection("datasheet").updateOne({ "_id": ObjectId(idDatasheet) }, { $set: { "variations": dsVariations } });
  //retrieve updated datasheet
  const datasheetUpdated = await client.db("covamatDB").collection("datasheet")
    .findOne({ "_id": ObjectId(idDatasheet) });

  return map(datasheetUpdated);
}


