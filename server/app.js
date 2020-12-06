const express = require("express");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");
const adminRouter = require("./routers/admin");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT;
require("./db/db");
const { urlGoogle } = require("./services/google-utils");

const app = express();
app.use(express.static(path.join(__dirname, "../public/dist")));
app.get("/google/url", (req, res) => {
  res.send(urlGoogle());
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(adminRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
