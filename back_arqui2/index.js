const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
const express = require("express");
const cors = require("cors");

const mysqlController = require("./mysql_A");


const port = new SerialPort("COM3", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));
/**
 * App Variables 3
 */
 const port2 = 8080;
 const app = express();
 const server = require("http").createServer(app);
 const io = require("socket.io")(server, {
   cors: { methods: ["GET", "PATCH", "POST", "PUT"], origin: "*" },
 });
 /**
  *  App Configuration
  */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors());

/**
 * Middlewares
 * CORS
 * MORGAN
 * EXPRESS.JSON
 * EXPRESS.URLENCONDED
 */
 

port.on("open", () => {
	console.log("Se abrió la comunicación");
});

parser.on("data", (data) => {
  mysqlController.insert(data);
	//console.log(data);
  io.on("connection", (socket) => {
    console.log("We have a new conecction!!");
    socket.on("dia", async (dia) => {
      let datos = await mysqlController.getday2(dia);
      console.log(datos);
      socket.emit("resultado",datos);
    });
    socket.emit("datos", data);
  })
});


/**
 * Socket io
 
io.on("connection", (socket) => {
  console.log("We have a new conecction!!");
  socket.on("top", async (data) => {
      mysqlController.insert(data);
  })

  socket.on("dia", async (dia) => {
    mysqlController.getday(dia);
  });

  let top='hola 4'
  socket.emit("top", top);
})

*/
/**
 * Server Activation
 */
 server.listen(port2, () => {
  console.log(`Listening to requests on http://localhost:${port2}`);
});