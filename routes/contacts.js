const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
let contactsCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('contactsDB');
    contactsCollection = db.collection('contacts');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectDB();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await contactsCollection.find().toArray();
    res.json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const contact = await contactsCollection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

module.exports = router;
