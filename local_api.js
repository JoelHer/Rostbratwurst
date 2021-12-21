const { exec } = require('child_process');
const express = require('express')
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

app = express()
port = config.apiPort

app.get('/', (req, res) => {
    res.send('Rostbratwurst API')
    })

    app.listen(port, () => {
    process.stdout.write(`Local api listening at http://localhost:${port}`)
})