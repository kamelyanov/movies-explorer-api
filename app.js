const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(errors()); //обработчик ошибок celebrate
//централизованный обработчик


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});