const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();



app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/admin', require('./routes/admin.routes'));

app.use('/api/catalog', require('./routes/catalog.routes'));

app.use('/api/user', require('./routes/user.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoURL'), {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => console.log(`App has been started on ${PORT}`));
  } catch (e) {
    console.log(e.message);

    process.exit(1);
  }
}

start();

