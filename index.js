const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        // Creating database
        const tasksCollection = client.db("easyTask").collection("tasks");

        // Creating data 
        app.post('/task', async (req, res) => {
            const task = req.body;
            const result = await tasksCollection.insertOne(task);
            res.send(result);
        })

        // Getting data 
        app.get('/task', async (req, res) => {
            const query = {};
            const tasks = await tasksCollection.find(query).toArray();
            res.send(tasks);
        })

        // Getting data by id
        app.get('/task/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await tasksCollection.findOne(filter);
            res.send(result);
        })

        // Updating Data 
        app.put('/updatedTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updatedMsg = {
                $set: { message: req.body }
            }
            console.log(updatedMsg);
            const result = await tasksCollection.updateOne(filter, updatedMsg, option);
            res.send(result);
        })

        // Deleting Data 
        app.delete('/remove/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await tasksCollection.deleteOne(filter);
            res.send(result);
        })

        // Updating Completed Data 
        app.put('/completed/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const option = { upsert: true };
            const updatedDoc = {
                $set: { completed: true }
            }
            const result = await tasksCollection.updateOne(filter, updatedDoc, option);
            res.send(result);
        })
    }
    finally {

    }
}
run()
    .catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send('task server is running');
});

app.listen(port, (req, res) => {
    console.log('server is running on port: ', port);
})