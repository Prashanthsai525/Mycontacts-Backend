const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  updateContacts,
  createConstacts,
  deleteContacts,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContacts).post(createConstacts);

router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);

module.exports = router;
