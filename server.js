const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:timestamp', (req, res) => {
  res.json(getTimestampObject(req.params.timestamp));
});

function getTimestampObject (timestamp) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
  let date;

  if (Number(timestamp)) { // it's a timestamp
    date = new Date(Number(timestamp) * 1000);
  } else if (Date.parse(timestamp)) { // it's a string of a date
    date = new Date(Date.parse(timestamp));
  } else {
    date = null;
  }

  return {
    unix: date ? date.getTime() / 1000 : null,
    natural: date ? `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` : null
  };
}

app.listen(process.env.PORT || 3000, () => console.log('The server is running.'));
