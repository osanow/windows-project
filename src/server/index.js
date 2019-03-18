const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const errorController = require('./controllers/error');
const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');
const verifyToken = require('./controllers/verifyToken');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

app.use('/auth', authRouter);
app.use('/items', verifyToken, itemsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://user:DBEEO232zGYWFWMz@cluster0-gmyy5.mongodb.net/windowsProject?retryWrites=true',
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
