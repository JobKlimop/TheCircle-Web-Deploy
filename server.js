const express = require('express');
const http = require('http');

const app = express();
const path = require('path');
app.use(express.static('./dist/seechange'));
app.get('/*', function(req, res) {
  res.sendFile(path.join('./dist/seechange/index.html'));
});

app.listen(port, () => console.log(`Angular server running on port ${port}`));
