let express = require('express')

let app = express();

app.use(express.static(__dirname + '/dist/medicab/'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname + '/dist/medicab/index.html')
})

app.listen(process.env.PORT || 8080)