const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const intervalId = setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    res.write(`data: ${currentTime}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = server; 
