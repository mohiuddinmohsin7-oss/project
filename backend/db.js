const url = process.env.DB_URL;
const {MongoClient} =require('mongodb');
const client= new MongoClient(url);
let collection;
async function connectDB(dbname,table)
{
    let result=await client.connect();
    let db= result.db(dbname);
    collection = db.collection(table);
    console.log("DataBase Connected...");
    return collection;
}

async function getData(username,pass)
{
   collection = await connectDB("csme","csme");
   let response = await collection.find({name:username}).toArray();
   return response;
}
async function postData(username,pass) {
    collection=await connectDB("csme","csme");
    const isExist= await collection.findOne({name:username});
    if (!isExist){
    await collection.insertOne({name:username,password:pass});
    return true;
    }
    else{
        return false;
    }
}
module.exports={getData,postData}
