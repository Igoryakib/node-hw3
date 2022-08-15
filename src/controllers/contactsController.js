const contact = require('../models/contact');

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contactById = await contact.findById(contactId);
    if (!contactById) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json(contactById);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

const createContact = async (req, res) => {
  try {
    const newContact = await contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

const changeContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) {
    return res.status(400).json({ message: "missing required name field" });
  }
  try {
    const updatedContact = await contact.findByIdAndUpdate(contactId, req.body, {
      new: true
    })
      if (!updatedContact) {
        return res
          .status(404)
          .json({ message: `Contact with id ${contactId} not found` });
      }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await contact.findByIdAndDelete(contactId);
      if (!deletedContact) {
        return res
          .status(404)
          .json({ message: `Contact with id ${contactId} not found` });
      }
    res.json({
      message: "contact deleted",
      deletedContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const updatedContact = await contact.findByIdAndUpdate(
      contactId,
      {
        favorite: req.body.favorite
      },
      {
        new: true,
      }
    );
    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  changeContact,
  deleteContact,
  updateStatusContact,
};
