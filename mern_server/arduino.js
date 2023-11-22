


// arduino 설정
import { SerialPort } from 'serialport';
var serialPort = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
  // defaults for Arduino serial communication
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
})

// 아두이노 연결
serialPort.on('open', function () {
  console.log('open serial communication');
  serialPort.on('data', function (data) {
    console.log(data.toString());
  });
  // console.log('Data: ', serialPort);
})


// arduino web
app.get('/led/:action', function (req, res) {

  var action = req.params.action || req.params;


  if (action == 'on') {

    serialPort.read(function (err) {
      if (err) {
        return console.error('Error writing to serial port: ', err.message);
      }
      console.log(flowrate, analogRead(A0));
      return res.send(analogRead(A0));
    });
  }
  else {
    return res.send('Action: ' + action);
  }

});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/news', (req, res) => {
  db.collection('post').insertOne({ title: '타이틀' })
  // res.send('뉴스다')
})

app.get('/list', async (req, res) => {
  let result = await db.collection('post').find().toArray()
  // console.log(result[0].title)

  res.render('list.ejs', { post: result })
})

app.get('/time', async (req, res) => {
  const date = new Date().toISOString().split('T')[0]
  console.log(date)
  res.render('time.ejs', { data: date })
})

app.get('/write', (req, res) => {
  res.render('write.ejs')
})

app.post('/new-post', async (req, res) => {
  try {
    if (req.body.title == '' || req.body.content == '') {
      res.send('제목이 없습니다.')
    } else {
      await db.collection('post').insertOne({ title: req.body.title, content: req.body.content })
      res.redirect('/list')
    }
  } catch (e) {
    console.log(e)
    res.status(500).send('서버 에러 났습니다.')
  }

})