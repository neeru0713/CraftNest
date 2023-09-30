const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const app = express();
app.use(cors);

const server = app.listen(8080, () => {
    console.log(`server started on 8080`)
})
const io = socket(server , {
  cors: {
    origin: "http://localhost:3000"
  },
});



// const server = createServer(app);
// const io = new Server(server);


app.get("/", (req, res) => {
    res.json({
        "hello": "welcome"
    })
})

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    console.log("............")
    socket.on('custom', (msg, id) => {
        socket.to("test").emit("send", msg)
        console.log(msg, socket.id)
    })
    socket.on("join-room", (room) => {
        socket.join(room)
    })
});

// server.listen(8080, () => {
//   console.log("server running at http://localhost:8080");
// });
