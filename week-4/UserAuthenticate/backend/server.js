require('dotenv').config();
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const userAuthModel = new mongoose.model('userAuth', userSchema);

const db = mongoose.connection;
db.once('open', ()=>{
  console.log('MongoDB connected successfully');
})

console.log(process.env.MONGO_URI)

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup',(req,res)=>{
  const {Email , password} = req.body;
  const chandu = new userAuthModel({email:Email , password:password});
  console.log(chandu);

    chandu.save()
    .then(()=>{
      res.status(200).send(`User created successfully`);
    })
    .catch((err)=>{
      res.status(500).send(`Error saving user`);
    })
  })

  app.post('/login',(req,res)=>{
    const {email , password} = req.body;
    console.log(email , password);

    userAuthModel.findOne({email:email , password:password})
    .then((user)=>{
      if(user)
      res.status(200).send(`User Found`);
    else res.status(404).send(`User Not Found`);
    })
    .catch((err)=>{
      res.status(404).send(`User Not Found`);
    })    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})