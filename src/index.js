const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Project_3:Project_3@cluster0.erch6.mongodb.net/Project-3-Group-DB",
{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) );

app.use('/',route);

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: `Not found ${req.url}`
    })
})

app.listen(process.env.PORT || 3000, (err)=> {
    console.log("Connected to PORT 3000")
});