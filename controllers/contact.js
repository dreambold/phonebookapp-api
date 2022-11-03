const Contact = require("../models/contact");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.createContact = (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err, contact) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        error: "Not able to save contact in Databse...",
      });
    }
    res.json({ contact });
  });
};

//Update
exports.updateContact = (req, res) => {
  const { id } = req.query;
  if (id == "" || id == undefined || id == null) {
    return res.status(400).json({
      error: "id params not found",
    });
  }

  Contact.find({ _id: id }).exec((error, contact) => {
    if (error) {
      return res.status(400).json({
        error: "contact Not Found",
      });
    }

    if (contact) {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
      };

      Contact.updateOne({ _id: id }, data)
        .then(() => {
          Contact.find({ _id: id }).exec((err, getContact) => {
            res.status(200).json({
              message: "Category Update Successfully...",
              UpdateContact: getContact,
            });
          });
        })
        .catch(() => {
          res.status(400).json({
            message: "  Somthing was worng ............",
          });
        });
    }
  });
};

//delete
exports.removeContact = (req, res) => {
  const { id } = req.query;

  if (id == "" || id == undefined || id == null) {
    return res.status(400).json({
      error: "contact id {params} not found",
    });
  }

  Contact.findOne({ _id: id }).deleteOne((error, deletecontact) => {
    if (error || deletecontact.deletedCount == 0) {
      return res.status(400).json({
        error: "contact not found..",
      });
    }
    res.json({
      message: "contact Delete Successfully",
    });
  });
};

//listing product
exports.getAllContacts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortB : "_id";

  Contact.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, contacts) => {
      if (err) {
        return res.status(400).json({
          error: "Contacts are not found",
        });
      }
      res.json(contacts);
    });
};
