require("dotenv").config();
const fs = require("fs");
require("./events.js");
const cors = require("cors");
const path = require("path");
const express = require("express");
const server = express();
const app = require("http").createServer(server); //socket.io <1>
const io = require("socket.io")(app);
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const productRouter = express.Router();
const userRouter = express.Router();
const authRouter = express.Router();

//Database connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is Connected!");
  } catch (err) {
    console.error(err);
  }
}
main();
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    var decoded = jwt.verify(token, publicKey);
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};
//Socket connection <2>
io.on("Connection", (socket) => {
  console.log("socket Backend:", socket.id);

  socket.on("msg", (data) => {
    console.log({ data });
  });
  setTimeout(() => {
    socket.emit("Server_MSG", { server: "h1" });
  }, 5000);
});
// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
// Routes
server.use("/auth", authRouter);
server.use("/products", productRouter);
server.use("/users", auth, userRouter);
// Products CRUD
const authController = require("./controller/auth");
authRouter.post("/signUp", authController.signUp);
authRouter.post("/login", authController.login);

const productController = require("./controller/product");
productRouter
  .post("/", productController.createProduct)
  .get("/ssr", productController.getAllProductsSSR)
  .get("/add", productController.getAddForm)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

// Users CRUD
const userController = require("./controller/users");
userRouter
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUser)
  .put("/:id", userController.replaceUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser);

// Serve static files
server.use(express.static(path.resolve(__dirname, "dist")));

// Catch-all handler to serve React app for any unknown route
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

//now scocket.io means variable named io listen the server  <3>
app.listen(process.env.PORT, () => {
  console.log("Server started at PORT:", process.env.PORT);
});
