const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');


const server = new WebSocket.Server({ port: 3001 });
const ws = new WebSocket('ws://localhost:3001/ws');
const wss = new WebSocket.Server({ server, path: 'ws' });
const app = express();
const port = 3001;

app.use(bodyParser.json());



app.post('/arduino-data', async (req, res) => {
  const dataFromArduino = req.body.data;

  console.log('Data from Arduino:', dataFromArduino); // 전송된 데이터는 req.body에 있을 것으로 예상


  app.listen(port, () => {
    console.log(`Server is running at http://localhost:3001`);
    console.log('Data from Arduino:', dataFromArduino);
  })
});