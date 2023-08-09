const fs = require("fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts () {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById =
    contacts.find((contact) => contact.id === contactId) || null;
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// const idContact = getContactById("AeHIrLTr6JkxGE6SN-0Rw");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
