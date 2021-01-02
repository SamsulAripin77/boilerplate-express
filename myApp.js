var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/assets',express.static(__dirname + '/public'))

app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})
app.get("/", (req, res) => {
  let absolutePath = __dirname + '/views/index.html'
  res.sendFile(absolutePath)
});

app.get('/now',(req,res,next) => {
  req.time = new Date().toString()
  next()
},(req,res) => {
  res.send({time: req.time})
})

app.get('/json',(req,res) => {
var message = 'Hello Json'
if (process.env.MESSAGE_STYLE === "uppercase") {
  message = message.toUpperCase();
} else if (process.env.MESSAGE_STYLE === 'lowercase'){
  message = message.toLowerCase()
}
res.json({"message": message})
})

app.get('/:word/echo',(req,res,next) => {
  let word = req.params.word
  res.send({echo: word})
  next()
})


app.post('/name',(req,res,next) => {
  let {first,last} = req.body
  res.send({name: `${first} ${last}`})
})
































module.exports = app;
