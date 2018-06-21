const express = require('express');
const http = require('http');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('', function(req, res) {
    res.sendFile(path.join('dist', 'index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join('dist', 'index.html'));
});

const port = process.env.PORT || '4200';
app.set('port', port);

app.listen(port, () => console.log(`Angular server running on port ${port}`));
