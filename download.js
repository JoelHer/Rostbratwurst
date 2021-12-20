const http = require('https');
const fs   = require('fs');
module.exports = {
    downloadLatest() {
        console.log('Downloading data...')
        const tempfile = fs.createWriteStream("disse.txt");
        const request = http.get("https://raw.githubusercontent.com/JoelHer/Rostbratwurst/main/disse.txt", function(response) {
            response.pipe(tempfile)
            console.log('Downloading Complete...')
            console.log('Please restart programm to apply changes...')
            console.log('Exiting in 3 seconds...')
            setTimeout(function () {
                process.exit()
            }, 3000)
        })
    }
}
