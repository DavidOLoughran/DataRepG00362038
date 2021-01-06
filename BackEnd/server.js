const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Tells app where to find the build and static folders
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build/static')));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Connecting to Mongoose database
const myConnectionString = 'mongodb+srv://admin:admin@cluster0.tmyqd.mongodb.net/ufcFighters?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;
const fighterSchema = new Schema({
    Name:String,
    Age:String,
    Poster:String
});

var fighterModel = mongoose.model('fighter', fighterSchema);


app.get('/api/fighters', (req, res) => {

    fighterModel.find((err,data)=>{
        res.json(data);
    })
    
})

app.get('/api/fighters/:id',(req, res)=>{

    console.log(req.params.id);

    fighterModel.findById(req.params.id, (err,data)=>{
        res.json(data);
    })
})

app.put('/api/fighters/:id',(req,res)=>{
    console.log("Update "+req.params.id);

    fighterModel.findByIdAndUpdate(req.params.id,
        req.body,
        (err,data)=>{
            res.status(201).send(data);
        })
})

app.delete('/api/fighters/:id', (req, res)=>{
    console.log(req.params.id);

    fighterModel.findByIdAndDelete({_id:req.params.id},
         (err, data)=>{
        res.send(data);
    })
})

app.post('/api/fighters', (req, res) => {
    console.log(req.body);

    fighterModel.create({
        Name:req.body.Name,
        Age:req.body.Age,
        Poster:req.body.Poster
    })
    .then()
    .catch();

    res.send('Data Recieved!');
})

//Shows app where to find index.html
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})