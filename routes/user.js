const express = require("express");
const router = express.Router();
const auth = require("../auth");
const UserController = require("../controllers/user");

//User Information
//login of a user
router.post("/email-exists", (req, res) => {
  UserController.emailExists(req.body).then((result) => res.send(result));
});

//registration of a user
router.post("/", (req, res) => {
  UserController.register(req.body).then((result) => res.send(result));
});

//logging in of a user
router.post("/login", (req, res) => {
  UserController.login(req.body).then((result) => res.send(result));
});

//getting the information of a user and displaying it to his/her profile
router.get("/details", auth.verify, (req, res) => {
  const user = auth.decode(req.headers.authorization);
  UserController.get({ userId: user.id }).then((user) => res.send(user));
});

//update details of a user
router.put("/updating-details", auth.verify, (req, res) => {
  UserController.update(req.body).then((result) => res.send(result));
});

//change password of a user
router.put("/change-password", (req, res) => {
  UserController.changePassword(req.body).then((result) => res.send(result));
});

//update avatar
router.put("/details", auth.verify, (req, res) => {
  UserController.update(req.body).then((result) => res.send(result));
});

//profile upload
router.put("/upload", auth.verify, (req, res) => {
  UserController.upload(req.body).then((result) => res.send(result));
});

//Categories
//create categories
router.post("/create-category", auth.verify, (req, res) => {
  const params = {
    userId: auth.decode(req.headers.authorization).id,
    categoryName: req.body.categoryName,
    categoryType: req.body.categoryType,
    categoryIcon: req.body.categoryIcon,
  };
  UserController.createCategory(params).then((result) => res.send(result));
});

//update categories
router.put("/update-category", auth.verify, (req, res) => {
  UserController.update(req.body).then((result) => res.send(result));
});

//delete categories
router.put("/delete-category", auth.verify, (req, res) => {
  UserController.archive(req.body).then((result) => res.send(result));
});

//create records
router.post("/add-record", auth.verify, (req, res) => {
  const params = {
    userId: auth.decode(req.headers.authorization).id,
    categoryName: req.body.categoryName,
    categoryType: req.body.categoryType,
    categoryIcon: req.body.categoryIcon,
    transactionBalance: req.body.transactionBalance,
    amount: req.body.amount,
    description: req.body.description,
    currentBalance: req.body.currentBalance,
    dateCreated: req.body.dateCreated,
  };
  UserController.addRecord(params).then((result) => res.send(result));
});

//update records
router.put("/update-record", auth.verify, (req, res) => {
  UserController.updateRecord(req.body).then((result) => res.send(result));
});

//delete records
router.put("/delete-record", auth.verify, (req, res) => {
  UserController.archiveRecord(req.body).then((result) => res.send(result));
});

//update balance of a user
router.put("/updating-balance", auth.verify, (req, res) => {
  UserController.updateBalance(req.body).then((result) => res.send(result));
});

//update transactionBalance
router.put("/transaction-balance", auth.verify, (req, res) => {
  UserController.updateTransactionBalance(req.body).then((result) =>
    res.send(result)
  );
});

//verify google
router.post("/verify-google-id-token", async (req, res) => {
  res.send(await UserController.verifyGoogleTokenId(req.body.tokenId));
});

module.exports = router;
