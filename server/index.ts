const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT: string = process.env.PORT || "1337";
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.ws('/', (ws) => {
  ws.on('message', data => {
    const parseData = JSON.parse(data);
    switch (parseData.method) {
      case "connection":
        connectionHandler(ws, parseData);
        break;
      case "draw":
        broadcastConnection(ws, parseData);
        break;

    }
  })
})

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '')
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json({message: "loaded"})
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "error save img"})
  }
})
app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
    const data = `data:image/png;base64,` + file.toString('base64')
    res.json(data)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: "error get img"})
  }
})

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const connectionHandler = (ws, data) => {
  ws.id = data.id;
  broadcastConnection(ws, data);
}

const broadcastConnection = (ws, data) => {
  aWss.clients.forEach(client => {
    if (client.id === data.id) return client.send(JSON.stringify(data))
  })
}