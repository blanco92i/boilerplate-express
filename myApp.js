let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();



app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next)=>{
  console.log(
    `${req.method} ${req.path} - ${req.ip}`
  )
  next()
})

// Create a GET route for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/views/index.html'); 
});

app.get('/json',(req,res)=>{
  const message ='Hello json'
  if(process.env.MESSAGE_STYLE==='uppercase'){
    res.json({message:message.toUpperCase()})
  }else{
    res.json({message})
  }
})

app.get('/now',(req,res,next)=>{
  req.time = new Date().toString()
  next()},
  (req,res)=>{
    res.json({time:req.time})
  }
)

app.get('/:word/echo',(req,res,nex)=>{
  res.json({echo:req.params.word})
})

app.route('/name')
.get((req,res)=>{
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.json({name:`${firstname} ${lastname}`})
})
.post((req,res)=>{
  const firstname = req.body.first;
  const lastname = req.body.last;
  res.json({name:`${firstname} ${lastname}`})
})

app.use('/public',express.static(__dirname + '/public'))

// Export the app module
module.exports = app;