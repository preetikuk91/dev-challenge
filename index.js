/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

var table = require("./es6/table.js");

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

// To get the data from stomp
function connectCallback() {
  const tableCls = table.default;
  const t = new tableCls();
  client.subscribe("/fx/prices", t.addData);
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})