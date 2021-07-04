const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression'); 

const app = express();

app.use(compression());

app.use(express.static('./dist/OblakoAngular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/OblakoAngular/'}),
);

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("running"));
