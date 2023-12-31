const db = require('../db');
// const conn = db.dbconnection();

// Read the file content using Async
async function readTrainees(req, res) {
    try {
        // const conn = await db.getDB();
        const conn = await db.dbconnection();
        // await conn.db("TraineesDB");
        // console.log(conn);
        const obj = req.body;
        const results = await conn.collection("Trainees").find(obj).toArray();
    
        res.json({"data": results, "msg": "success"})
    } catch (err) {
        res.json({ "error": err.message });
    }
}

// Read the file content using Async
async function readSpecificTrainee(req, res) {
    try {
        // const conn = await db.getDB();
        const conn = await db.dbconnection();
        const obj = req.body;
        const results = await conn.collection("Trainees").find(obj).toArray();
    
        res.json({"data": results, "msg": "success"})
    } catch (err) {
        res.json({ "error": err.message });
    }
}

// Write the file content using Async
async function createTrainee(req, res) {
    try {
        // const conn = await db.getDB();
        const conn = await db.dbconnection();
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await conn.collection("Trainees").find({"name": obj.name}).toArray();
    
            if(resultsArr.length > 0)
                res.json({"msg":"Trainee already Exists!"});
            else {
                const results = await conn.collection("Trainees").insertOne(obj);
    
                console.log(results);
                if(results.insertedId !== "")
                    res.json({"msg":"Trainee has been created successfully!"});
                else
                    res.json({"msg":"Unable to create trainee"});
            }
        } else
            res.json({"msg":"No Data to Create"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

async function deleteTrainee(req, res) {
    try {
        // const conn = await db.getDB();
        const conn = await db.dbconnection();
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await conn.collection("Trainees").find({"name": obj.name}).toArray();
    
            if(resultsArr.length > 0) {
                const results = await conn.collection("Trainees").deleteOne(obj);
                console.log(results);
                if(results.deletedCount !== "")
                    res.json({"msg":"Trainee has been deleted successfully!"});
                else
                    res.json({"msg":"Unable to delete trainee"});
            } else {
                res.json({"msg":"No Data to Delete"});   
            }
        } else
            res.json({"msg":"No Data to Delete"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

async function updateTrainee(req, res) {
    try {
        // const conn = await db.getDB();
        const conn = await db.dbconnection();
        const obj = req.body;
        if(JSON.stringify(obj) !== "{}") {
            const resultsArr = await conn.collection("Trainees").find({"name": obj.name}).toArray();
    
            if(resultsArr.length > 0) {
                const results = await conn.collection("Trainees").updateOne({"name": obj.name}, {$set: obj});
                console.log(results);
                if(results.modifiedCount !== "")
                    res.json({"msg":"Trainee has been updated successfully!"});
                else
                    res.json({"msg":"Unable to update trainee"});
            } else {
                res.json({"msg":"No Data to Update"});   
            }
        } else
            res.json({"msg":"No Data to Update"});
    } catch (err) {
        res.json({ "error": err.message });
    }
}

module.exports = {
    readTrainees,
    readSpecificTrainee,
    createTrainee,
    updateTrainee,
    deleteTrainee
}