const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const { User } = require("./models/user.model");

const socket = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
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
app.use("/user", userRoutes);

// node / express server
const server = app.listen(8080, () => {
  console.log(`server started on 8080`);
});

const io = socket(server, {
  cors: {
    origin: [
      "https://main--genuine-scone-41e56a.netlify.app",
      "http://localhost:3000",
      
    ],
  },
});


// const server = createServer(app);
// const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("send-message", (msg, receiverSocketId) => {
   console.log(msg)
   console.log("Sender socketid", socket.id)
   console.log("Receiver socketid", receiverSocketId)

    socket.to(receiverSocketId).emit("receive-message", msg, socket.id);
  });
// jida e ek newa user jdo banda (new tab khulda ae) ohdo ohdi newi socket id v bandi ae
// server nu and us client nu pta h new user di socket id , client save-socket-id name da event emit krda ae and is event nu oh apni user_id pejda ae fir sada server us event nu sunda ae and iss (saveSocketIdUserModel) function nu call krda ae, saveSocketIdUserModel func vich phile user te find method la
// ke user lbega te ohde vich socket id nu paa ke user.save krwa dewega eda us user de document vich  socket id save ho jayegi 
// purpose of saving socket.id
// sender ne server nu receiver di id or msg pejega hun server oh receiver di id nu match krega ager receiver id match ho rhi ae onnu database receiver di socketid nu save kr dewega hun server ko sara kuj howega receiver di socket id v msg v . hun server ko receiver di socket id aa chuki hain iss krke server us particular socket nu sender da msg pej skda ae

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

  socket.on('chat request', async (data) => {
    // Handle chat request logic
    // Emit notification to the receiver
    io.to(data.receiverSocket).emit('chat request', data);
});

socket.on('accept chat', (data) => {
    // Handle accepted chat logic
});

socket.on('chat message', async (data) => {
    // Handle storing chat messages
    const chat = new Chat({ sender: data.sender, receiver: data.receiver, message: data.message });
    await chat.save();
    // Emit the message to the receiver
    io.to(data.receiverSocket).emit('chat message', data);
});

});

// server.listen(8080, () => {
//   console.log("server running at http://localhost:8080");
// });
