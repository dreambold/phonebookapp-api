const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  updateContact,
  removeContact,
} = require("../controllers/contact");

router.post("/contact/create", createContact);
router.get("/contact/find", getAllContacts);
router.put("/contact/update", updateContact);
router.delete("/contact/remove", removeContact);

module.exports = router;
