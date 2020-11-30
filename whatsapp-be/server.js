const express = require('express')
const mongoose = require('mongoose')
const Messages = require('./dbMessages')
const Pusher = require('pusher');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;

const pusher = new Pusher({
    appId: "1109945",
    key: "19e3d6908a7c30384cb0",
    secret: "7afeb5a80d50678056ea",
    cluster: "eu",
    useTLS: true
  });

app.use(express.json());
app.use(cors());

const uri = "mongodb://akky:RAyhg4deJ5GSC5zE@cluster0-shard-00-00.sq33s.mongodb.net:27017,cluster0-shard-00-01.sq33s.mongodb.net:27017,cluster0-shard-00-02.sq33s.mongodb.net:27017/whatsapp?ssl=true&replicaSet=atlas-122zg7-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect( uri, {useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true
                    }, console.log('connected to database')
                    
                );
            
const db = mongoose.connection

db.once('open', () =>{
    console.log('Connected to Database')    

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('A Change Occurred', change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            }) 
        } else {
            console.log("Error Triggering Pusher");
        }
    })

})


                    

app.get('/', (req, res) =>{
    res.status(200).send('Hello from server');
})

app.get('/messages/sync', (req, res) =>{
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/api/v1/messages/new', (req, res) =>{
    const dbMessages = req.body

    Messages.create(dbMessages, (err, data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})


app.listen(port, () => console.log(`Listening on localhost: ${port}`))

