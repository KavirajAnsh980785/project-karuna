const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/karunaDB')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));

const RequestSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    accepted:{type:Boolean, default:false},
    donor:{type:String, default:""}
});

const Request = mongoose.model('Request', RequestSchema);

app.post('/add', async(req,res)=>{
    const data = new Request(req.body);
    await data.save();
    res.send('Saved');
});

app.get('/all', async(req,res)=>{
    const data = await Request.find();
    res.json(data);
});

app.post('/accept/:id', async(req,res)=>{
    await Request.findByIdAndUpdate(req.params.id,{
        accepted:true,
        donor:req.body.donor
    });
    res.send('Accepted');
});

app.listen(5000, ()=>console.log('Server running on port 5000'));

