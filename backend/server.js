const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const { User } = require("./models/user.model");

const socket = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const app = express();
app.use(cors());
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 


let mongoURI;
if (process.env.NODE_ENV === "production") {
  mongoURI =
  "mongodb+srv://neerurani1307:%40Neeru1307@neerucluster.z4krrc9.mongodb.net/craftnest?retryWrites=true&w=majority";
} else {
  mongoURI = "mongodb://localhost:27017/craftnest";
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.json({
    hello: "welcome",
  });
});

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

// node / express server
const server = app.listen(8080, () => {
  console.log(`server started on 8080`);
});

const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://main--genuine-scone-41e56a.netlify.app/",
    ],
  },
});


// const server = createServer(app);
// const io = new Server(server);



io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("send-message", (msg, receiverSockeId) => {
   
    socket.to(receiverSockeId).emit("receive-message", msg, socket.id);
  });

  async function saveSocketIdInUserModel(userId) {
    try {
      let user = await User.findById(userId);
      if (user) {
        user.socketId = socket.id;
        await user.save();
        console.log("Socket id saved in user model:", socket.id);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating socket id in user model:", error);
    }
  }

  // Handle save-socket-id event
  socket.on("save-socket-id", ({ userId }) => {
    // Update the user model in the database with the socket id
    saveSocketIdInUserModel(userId);
    
  });
  // socket.on("custom", (msg, id) => {
  //   socket.to("test").emit("send", msg);
  //   console.log(msg, socket.id);
  // });
  // socket.on("join-room", (room) => {
  //   socket.join(room);
  // });
});

// server.listen(8080, () => {
//   console.log("server running at http://localhost:8080");
// });
