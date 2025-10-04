// controllers/contacts.js
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET /contacts
const getAll = async (req, res) => {
  const cursor = mongodb.getDb().db().collection('contacts').find();
  const docs = await cursor.toArray();
  res.status(200).json(docs);
};

// GET /contacts/:id
const getSingle = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
  const doc = await mongodb.getDb().db().collection('contacts').findOne({ _id: new ObjectId(id) });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(doc);
};

// POST /contacts  -> 201 + { id }
const createContact = async (req, res) => {
  const required = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
  const ok = required.every((k) => req.body[k] && String(req.body[k]).trim() !== '');
  if (!ok) return res.status(400).json({ error: 'All fields are required' });

  const doc = {
    firstName: String(req.body.firstName).trim(),
    lastName: String(req.body.lastName).trim(),
    email: String(req.body.email).trim(),
    favoriteColor: String(req.body.favoriteColor).trim(),
    birthday: String(req.body.birthday).trim()
  };

  const result = await mongodb.getDb().db().collection('contacts').insertOne(doc);
  res.status(201).json({ id: result.insertedId });
};

// PUT /contacts/:id  -> 204
const updateContact = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  const required = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
  const ok = required.every((k) => req.body[k] && String(req.body[k]).trim() !== '');
  if (!ok) return res.status(400).json({ error: 'All fields are required' });

  const update = {
    $set: {
      firstName: String(req.body.firstName).trim(),
      lastName: String(req.body.lastName).trim(),
      email: String(req.body.email).trim(),
      favoriteColor: String(req.body.favoriteColor).trim(),
      birthday: String(req.body.birthday).trim()
    }
  };

  const result = await mongodb.getDb().db().collection('contacts')
    .updateOne({ _id: new ObjectId(id) }, update);

  if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
  return res.status(204).send();
};

// DELETE /contacts/:id  -> 200
const deleteContact = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  const result = await mongodb.getDb().db().collection('contacts')
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
  res.status(200).json({ deleted: true });
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
