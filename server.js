const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))



app.route('/')
.get((req, res) => {
  try {
    res.sendFile(__dirname + '/views/index.html');
  } catch (error) {
    res.json({error: error})
  }
});

app.route('/api/exercise/new-user')
.post((req, res) => {
  const { body } = req;
  const uname = body.username;
  try {
    res.json({message: uname})
  } catch (error) {
    res.json({error: error})
  }
})

app.route('/api/exercise/add')
.post((req, res) => {
  const { userId, description, duration, date } = req.body;
  try {
    res.json({user: {
      userId,
      description,
      duration,
      date
    }})
  } catch (error) {
    res.json({error: error})
  }
})

app.route('/api/exercise/log')
.get((req, res) => {
  const { userId } = req.query;
  try {
    res.json({user: {
      userId
    }})
  } catch (error) {
    res.json({error: error})
  }
})





const listener = app.listen(process.env.PORT || 5500, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
