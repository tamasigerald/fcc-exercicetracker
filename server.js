const express = require('express');
const app = express();
const cors = require('cors');
const mognoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User.model');
const Session = require('./models/Session.model');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

mognoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})


app.route('/')
.get((req, res) => {
  try {
    res.sendFile(__dirname + '/views/index.html');
  } catch (error) {
    res.json({error: error})
  }
});

app.route('/api/users')
.post(async (req, res) => {
  const { body } = req;
  const uname = body.username;
  try {
    const user = new User({
      username: uname
    })
    await user.save((err, doc) => {
      if (err) return res.json({error: err});
      res.json(doc);
    })
  } catch (error) {
    res.json({error: error})
  }
})
.get(async (req, res) => {
  try {
    await User.find((err, result) => {
      if (err) return res.json({error: err});
      res.json(result)
    });
  } catch (error) {
    res.json({error: error})
  }
});

app.route('/api/users/:id/exercises')
.post( async (req, res) => {
  let { userId, description, duration, date } = req.body;
  if (date === '' || date === undefined) {
    date = new Date().toISOString().slice(0, 10);
  }
  try {
    const session = new Session({
      userId: userId,
      description: description,
      duration: duration,
      date: date
    })
    session.save(async (err, doc) => {
      if (err) return res.json({error: err});
      await User.findOneAndUpdate({ _id: userId }, {
        $push: {logs: session._id}
      })
      res.json(doc);
    })
  } catch (error) {
    res.json({error: error})
  }
})
.get((req, res) => {
  const { id } = req.params;
  try {
    User.findOne({ _id: id })
    .populate('logs')
    .then(user => {
      const count = user.logs.length;
      const result = {
        user,
        count: count
      }
      res.json(result);
    })
  } catch (error) {
    res.json({error: error})
  }
})





const listener = app.listen(process.env.PORT || 5500, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
