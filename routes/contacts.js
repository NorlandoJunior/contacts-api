const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
let contactsCollection;

async function connectDB() {
  await client.connect();
  const db = client.db('contactsDB');
  contactsCollection = db.collection('contacts');
}
connectDB();

// GET all contacts
router.get('/', async (req, res) => {
  const contacts = await contactsCollection.find().toArray();
  res.json(contacts);
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const contact = await contactsCollection.findOne({ _id: id });
  res.json(contact);
});

module.exports = router;