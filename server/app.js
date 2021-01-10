const express = require("express");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");
const adminRouter = require("./routers/admin");
const gamesRouter = require("./routers/game");
const roomsRouter = require("./routers/rooms");
const path = require("path");
const passport = require("./helper/passport");
const socketServer = require("./socket/server");
require("./db/db");

const app = express();
app.use('/images', express.static(path.join(__dirname, "../public/images")));
app.use(express.static(path.join(__dirname, "../public/dist")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
socketServer(app);

app.use(userRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(gamesRouter);
app.use(roomsRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});
