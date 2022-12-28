const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = () => {
    try {
        // Creating database
        const collection = client.db("easyTask").collection("tasks");

        // Creating data 
        app.post('/task', async (req, res) => {
            const task = req.body;
            console.log(task);
        })
    }
    finally {

    }
}
run()


app.get('/', (req, res) => {
    res.send('task server is running');
});

app.listen(port, (req, res) => {
    console.log('server is running on port: ', port);
})