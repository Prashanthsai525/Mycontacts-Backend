const Contact = require("../models/contactmodel");
const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Create contact
//@route POST /api/contacts
//@access private

const createConstacts = asyncHandler(async (req, res) => {
  console.log("this request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Feilds are mandetory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

//@desc  Update contacts
//@route PUT /api/contacts/:id
//@access private

const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if(contact.user_id.tostring() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other's contacts")
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if(contact.user_id.tostring() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other's contacts")
  }
  
await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createConstacts,
  updateContacts,
  deleteContacts,
};
