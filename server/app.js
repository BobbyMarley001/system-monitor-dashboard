const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/metrics', (req, res) => {
  const scriptPath = path.join(__dirname, '../scripts/monitor.sh');
  exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });
});

app.get('/alerts', (req, res) => {
  const alertPath = path.join(__dirname, '../scripts/alert.sh');
  exec(`bash ${alertPath}`, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${stderr}`);
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => console.log(`Dashboard running at http://localhost:${PORT}`));


