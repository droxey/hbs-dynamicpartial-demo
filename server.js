/** Dependencies. */
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const hbs = require('handlebars');
const fs = require("fs");
const snippetsDirectory = 'views/snippets/';

/** Initialize Express app. */
let app = express();

/** Serve static content for the app from the "public" directory. */
app.use(express.static("public"));

/** Setup bodyParser. */
app.use(bodyParser.urlencoded({ extended: false }));

/** Setup express-handlebars as our View engine. */
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/** Import routes and give the server access to them. */
let routes = require("./controllers/controller.js");
app.use("/", routes);

/** Create handlebars partials for each item in /views/snippets. */
fs.readdirSync(snippetsDirectory).forEach(function(snippet) {
  var fileContents = fs.readFileSync(snippetsDirectory + snippet, 'utf8');
  var compiledTemplate = hbs.compile(fileContents);
  var slug = snippet.replace('.handlebars', '');
  hbs.registerPartial(slug, compiledTemplate);
});

/** Create 'showSnippet' helper that acts as a dynamic partial. */
hbs.registerHelper('showSnippet', function(slug, context, opts) {
  var loadedPartial = hbs.partials[slug];
  return new hbs.SafeString(loadedPartial(context));
});

/** Listen on specified port. */
let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port: ', port);
});