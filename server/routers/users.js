const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const validator = require("validator");
const router = express.Router();
const { _createRandomUID } = require("../helper/generator");
const { sendVerificationEmail, sendRecoverEmail, sendSuccessUpdateEmail } = require("../helper/emailSender");
const jwt = require("jsonwebtoken");
const passport = require("../helper/passport");

router
  .route("/api/users")
  .post(async (req, res) => {
    //POST: tạo user mới
    // Create a new user
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password)
        return res.status(400).send({ error: "Please fill out all email, name and password" });
      if (!validator.isEmail(email)) return res.status(400).send({ error: "Invalid Email address" });
      if (password.length < 7)
        return res.status(400).send({ error: "Password is shorter than the minimum allowed length 7" });
      const find = await User.findOne({ email });
      if (find) {
        return res.status(401).send({ error: "Signup failed! Already have account" });
      } else {
        const user = new User({ ...req.body, gameId: _createRandomUID() });
        await user.save();
        const token = await user.generateAuthToken();
        const { message, code } = await sendVerificationEmail(user, token);
        res.status(code).send(message);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get(auth, authAdmin, async (req, res) => {
    //GET: lấy danh sách user (phục vụ admin)
    //check quyền admin, và thực hiện
    //Tạm thời chưa apply phân quyền nên cứ gọi tới thì auto thực hiện thôi, không cần phải lăn tăn nhiều
    try {
      const users = await User.find().select("-password -tokens");
      res.status(201).send({ users });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(auth, authAdmin, async (req, res) => {
    //PUT: update 1 thuộc tính nào đó cho list user (block or unblock for all blocked users)
    //check quyền admin
    try {
      const { isBlocked } = req.query;
      const response = await User.updateMany({ isBlocked });
      res.status(201).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(auth, authAdmin, async (req, res) => {
    //DELETE: xoá tất cả user
    try {
      const response = await User.deleteMany();
      res.status(201).send({ response });
    } catch (error) {
      res.status(400).send(error);
    }
  });

//Verify account
router.get("/api/token/verify/:token", async (req, res) => {
  if (!req.params.token) return res.status(400).json({ message: "We were unable to find a user for this token." });
  try {
    // Find a matching token
    const data = jwt.verify(req.params.token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id });
    if (!user) return res.status(400).json({ message: "We were unable to find your token." });
    if (user.isVerified) return res.status(400).json({ message: "This user has already been verified." });
    user.isVerified = true;
    await user.save();
    res.cookie("x-auth-cookie", req.params.token);
    res.redirect("/auth/success");
    //res.status(200).send("The account has been verified. Please log in."); -> for mobile
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/api/token/resend", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });
    if (user.isVerified)
      return res.status(400).json({ message: "This account has already been verified. Please log in." });
    const token = await user.generateAuthToken();
    const { message, code } = await sendVerificationEmail(user, token);
    res.status(code).send(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Recover password concept:
/*
   1. User request recover password with email, POST to /api/recover/request
   2. Server generate reset-password token (expires in 1 hour), send verify link to user email
   3. User click on verify link,  go to /api/recover/verify/ with token params
   4. Server verify token, generate allow-update-password token, set in 'x-update-token' header and redirect to update password page
   5. User update password and post from form (newPass + token in 'x-update-token' header), POST to /api/recover/update
   6. Server update password, clear all token and lock resetPassword
   7. If server can't update password, hook pre-save will lock resetPassword next times it trigger
 */

//Recover password
router.post("/api/recover/request", async (req, res) => {
  //send email to recover password
  try {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ message: "The email address is not valid. Re-check the email you provided and try again." });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });
    //Generate and set password reset token
    user.generatePasswordReset();
    await user.save();
    //send email
    const { message, code } = await sendRecoverEmail(user);
    res.status(code).send(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Verified and redirect
router.get("/api/recover/verify/:token", async (req, res) => {
  if (!req.params.token)
    return res.status(400).json({ message: "We were unable to find a user for this reset password token." });
  try {
    const { token } = req.params;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(401).json({ message: "Password reset token is invalid or has expired." });
    const updateToken = user.generateAcceptChangePasswordToken();
    res.cookie("x-update-token", updateToken);
    res.redirect("/password/reset");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Reset password
router.post("/api/recover/update", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token) return res.status(400).json({ message: "Update token is required" });
    const { reset, allow } = jwt.verify(token, process.env.JWT_KEY);
    if (!reset || !allow) return res.status(400).json({ message: "Unable to parse token" });
    const user = await User.findOne({ resetPasswordToken: reset, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(401).json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.allowResetPassword = false;
    user.isVerified = true;

    // Save the updated user object
    await user.save();

    //send email
    const { message, code } = await sendSuccessUpdateEmail(user);
    if (code !== 200) res.status(code).send({ message });
    else {
      const newToken = await user.generateAuthToken();
      res.status(code).send(newToken);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
