// Express Framework
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
// Body Parser Library for Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

// Static Route to Serve the React App
app.use(express.static("../../build/"));

//server listening
const server = app.listen(1337);
const io = require('socket.io')(server);

io.on('connection', function (socket) { //2
  console.log("CONNECTED TO CLIENT SOCKET")
  socket.emit('greeting', { msg: 'New Connection' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });

  socket.on('newItem', function (data) { //7
    console.log("POST - ITEM")
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
    axios.post('http://5c953cd2498269001487f228.mockapi.io/dojoname', data.msg)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'added' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('getItem', function (data) {
    console.log("GET - ITEM")
    returnAll();
  });

  socket.on('deleteItem', function (data) {
    console.log("DELETE - ITEM")
    //axios delete call
    axios.delete(`http://5c953cd2498269001487f228.mockapi.io/dojoname/${data.msg}`)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'deleted' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('updateItem', function (data) {
    console.log("UPDATE - ITEM")
    console.log(data.msg);
    //axios delete call
    axios.put(`http://5c953cd2498269001487f228.mockapi.io/dojoname/${data.msg.id}`, data.msg)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'deleted' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });


  function returnAll() {
    axios.get('http://5c953cd2498269001487f228.mockapi.io/dojoname')
      .then((res) => {
        io.emit('newdata', { payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

});


// SERVER LISTENING