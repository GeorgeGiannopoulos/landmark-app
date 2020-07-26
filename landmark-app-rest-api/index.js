// Example express application adding the parse-server module to expose Parse
// compatible API routes.
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const parseServerConfig = require('./config/parse-server'); // server configuration
const parseDashboardConfig = require('./config/parse-dashboard'); // dashboard configuration

const api = new ParseServer(parseServerConfig); // Serve the Parse API on the /parse URL prefix
const dashboard = new ParseDashboard(parseDashboardConfig); // Parse dashboard
const landmarksAPI = require('./routes/landmarksAPI'); // Landmarks API

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable bodyParser

// Parse mount. Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// End points
app.use(mountPath, api);
app.use('/dashboard', dashboard);
app.use('/landmarks', landmarksAPI);

// ========== Test the parse-server (start) ==========
// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
    res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/test.html'));
});
// ========== Test the parse-server (end) ==========

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
