const express = require("express");
const hbs = require('handlebars');

let employeeData = require('../utils/employees');
let router = express.Router();


/**
 * Render the index page.
 *
 * @name Index
 * @route {GET} /
 */
router.get("/", function(req, res) {
  res.render("index", {
    employees: employeeData
  });
});


/**
 * Render a handlebars snippet as the result of a POST action.
 *
 * @name PostAndReturnSnippet
 * @route {POST} /snippets/:slug
 * @routeparam {String} :slug is the file name of the snippet to load.
 * @routeparam {String} :key is the optional key to fetch from employeeData
 */
router.post("/snippets/:slug", function(req, res) {
  /** Load the partial. */
  var slug = req.param("slug");
  var loadedPartial = hbs.partials[slug];
  if (!loadedPartial) {
    return res.status(404).json({ 
      error: 'Snippet with name "' + slug + '" not found.' 
    });
  }
  
  /** Save the POST body in a new object and add it to employeeData. */
  var newEmployee = {
    name: req.body.username,
    role: req.body.role,
    company: req.body.company
  };
  
  employeeData.push(newEmployee);
  
  /** Render the partial. */
  res.send(loadedPartial(newEmployee));
});


/** Export routes for server.js to use. */
module.exports = router;