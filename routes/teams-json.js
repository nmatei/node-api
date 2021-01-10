var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/team.json";

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

/**
 *
 */
router.get("/", function (req, res, next) {
  const content = fs.readFileSync(DATA_PATH);
  const persons = JSON.parse(content);
  res.json(persons);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gitHub = req.body.gitHub;

  let content = fs.readFileSync(DATA_PATH);
  const persons = JSON.parse(content);

  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  persons.push({
    id,
    firstName,
    lastName,
    gitHub
  });

  content = JSON.stringify(persons, null, 2);
  fs.writeFileSync(DATA_PATH, content);

  res.json({ success: true, id });
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  let content = fs.readFileSync(DATA_PATH);
  const persons = JSON.parse(content);

  const remainingPersons = persons.filter(function (person) {
    return person.id != id;
  });

  content = JSON.stringify(remainingPersons, null, 2);
  fs.writeFileSync(DATA_PATH, content);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gitHub = req.body.gitHub;

  let content = fs.readFileSync(DATA_PATH);
  const persons = JSON.parse(content);

  const contact = persons.find(function (person) {
    return person.id == id;
  });
  if (contact) {
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.gitHub = gitHub;
  }

  content = JSON.stringify(persons, null, 2);
  fs.writeFileSync(DATA_PATH, content);

  res.json({ success: true });
});

module.exports = router;
