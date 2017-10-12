const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const constants = require('./config/constants');

mongoose.connect(constants.MONGO_URI, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => console.error(err));

app.use(express.static(path.resolve(__dirname, '../../dist/client')));
app.use(bodyParser.json());
app.use(cookieParser(constants.COOKIE_SECRET, {
  httpOnly: true
}));

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.config.dev');
  const compiler = require('webpack')(config);

  compiler.plugin('done', () => {
    Object.keys(require.cache).forEach((id) => {
      if (/[\/\\]client[\/\\]/.test(id)) delete require.cache[id];
    });
  });

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/api', require('./routes'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/client/index.html'));
});

app.use((err, req, res, next) => {
  console.log(err);

  res.json({
    err
  });
});

app.listen(constants.PORT, () => {
  console.log(`Server running on port: ${constants.PORT}`);
});