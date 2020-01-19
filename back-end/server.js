require('./config/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_URL);
const data = require('./utils/data')

const logErrors = require('./utils/error-handler');

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1',require('./routes/routes'))

app.use(logErrors.consoleError)

client.on('connect', function() {
  console.log('Conectado a redis');
  data.map( item => {
    client.set(item.city, JSON.stringify(item), redis.print)
  })
  console.log('Data guardada en redis!')
});

client.on('error', function (err) {
  console.log('Error en redis: ' + err);
});

io.on('connection', (socket) => {
  console.log(`[ server.js ] ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`[ server.js ] ${socket.id} disconnected`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("************SERVER MAINTAINER*************")
  console.log(`Server iniciado en puerto ${process.env.PORT}`)
})