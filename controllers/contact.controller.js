const Contact = require("../models/contact.model");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({
      status: "ok",
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, and message are required.",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    return res.status(201).json({
      status: "ok",
      message: "Message sent successfully.",
      data: newContact,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllContacts,
  createContact,
};
