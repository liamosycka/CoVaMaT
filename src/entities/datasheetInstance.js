import { ObjectId } from 'mongodb';
import client from '../config/db.js';


  const map = (obj) => {
    const datasheetInstance = {
      _id: obj._id,
      id_datasheet: obj.id_datasheet,
      name: obj.name,
      domain: obj.domain,
      variationPoint: obj.variationPoint,
      varietyType: obj.varietyType,
      variations: obj.variations
  };
  return datasheetInstance;
}

export const getDatasheetsInstances = async () => {
  await client.connect();
  const result = client.db("covamatDB").collection("datasheetInstance").find()
  let datasheetsInstances = [];
  while (await result.hasNext()){
    datasheetsInstances.push(map(await result.next()))
  }
  client.close();
  return datasheetsInstances;
}

export const getDatasheetInstancesById = async (ids) => {
  await client.connect();
  const datasheetInstances = []
  for(var i =0; i<ids.length; i++){
    const result = await client.db("covamatDB").collection("datasheetInstance")
    .findOne({"_id": new ObjectId(ids[i])})
    datasheetInstances.push(result);
  }
  client.close();
  return datasheetInstances;
}

export const getDatasheetInstancesByIdAndContextType = async (ids) => {
  //await client.connect();
  const datasheetInstances = []
  for(var i =0; i<ids.length; i++){
    const result = await client.db("covamatDB").collection("datasheetInstance")
    .findOne({"_id": new ObjectId(ids[i]), varietyType: {name: "contexto"}})
    if(result!==null){
      datasheetInstances.push(result);
    }
  }
  //client.close();
  return datasheetInstances;
}

export const createDatasheetInstance = async (inputDatasheet) => {
  await client.connect();
  const idDatasheetInstance = await (await client.db("covamatDB").collection("datasheetInstance").insertOne(inputDatasheet)).insertedId;
  client.close();
  return idDatasheetInstance;
}
