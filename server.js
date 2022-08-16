const express = require('express');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const app = express();

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'),expressCspHeader({
  policies: {
    'default-src': [expressCspHeader.NONE],
    'img-src': [expressCspHeader.SELF],
  }
}));


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
