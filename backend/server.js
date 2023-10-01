const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const app = express();
app.use(cors);


const mongoURI = "mongodb://localhost:27017/craftnest";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;


db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});




const server = app.listen(8080, () => {
  console.log(`server started on 8080`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
app.use("/auth", authRoutes);

// const server = createServer(app);
// const io = new Server(server);

app.get("/", (req, res) => {
  res.json({
    hello: "welcome",
  });
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  console.log("............");
  socket.on("custom", (msg, id) => {
    socket.to("test").emit("send", msg);
    console.log(msg, socket.id);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

// server.listen(8080, () => {
//   console.log("server running at http://localhost:8080");
// });
