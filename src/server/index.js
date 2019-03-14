const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const authRouter = require('./routes/auth');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);

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
