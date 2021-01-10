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
  var content = fs.readFileSync(DATA_PATH);
  var persons = JSON.parse(content);
  res.json(persons);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var gitHub = req.body.gitHub;

  var content = fs.readFileSync(DATA_PATH);
  var persons = JSON.parse(content);

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
  var id = req.body.id;

  var content = fs.readFileSync(DATA_PATH);
  var persons = JSON.parse(content);

  var remainingPersons = persons.filter(function (person) {
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
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var gitHub = req.body.gitHub;

  var content = fs.readFileSync(DATA_PATH);
  var persons = JSON.parse(content);

  var contact = persons.find(function (person) {
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
